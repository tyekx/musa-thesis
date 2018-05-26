#include <iostream>
#include <thread>
#include <vector>
#include <boost/asio.hpp>
#include <chrono>
#include <atomic>

struct TestResult {
	double timeTaken;
	std::string Resource;
};

const std::string raw_ip_address = "192.168.0.227";
const unsigned short port_num = 80;

int N;
int C;
std::atomic_int completedIndex = -1;

int requestCount;
std::string * resources;
std::string * requests;
std::vector<TestResult> * results;


class SyncTCPClient {
public:
	SyncTCPClient(const std::string& raw_ip_address,
		unsigned short port_num) :
		m_ep(boost::asio::ip::address::from_string(raw_ip_address),
			port_num),
		m_sock(m_ios) {
		m_sock.open(m_ep.protocol());
	}
	void connect() {
		m_sock.connect(m_ep);
	}
	void close() {
		m_sock.shutdown(
			boost::asio::ip::tcp::socket::shutdown_both);
		m_sock.close();
	}
	std::string execute(const std::string & request) {
		sendRequest(request);
		return receiveResponse();
	};
private:
	void sendRequest(const std::string& request) {
		boost::asio::write(m_sock, boost::asio::buffer(request));
	}
	std::string receiveResponse() {
		boost::asio::streambuf buf;
		boost::asio::read_until(m_sock, buf, '\n');
		std::istream input(&buf);
		std::string response;
		std::getline(input, response);
		return response;
	}
private:
	boost::asio::io_service m_ios;
	boost::asio::ip::tcp::endpoint m_ep;
	boost::asio::ip::tcp::socket m_sock;
};


void WorkerMethod(int workerId) {
	SyncTCPClient tcpClient{ raw_ip_address, port_num }; int currId;
	std::chrono::time_point<std::chrono::steady_clock> startT, endT; std::chrono::duration<double> diff;
	int patternId;
	TestResult result;
	do {
		currId = ++completedIndex;

		if(currId >= N) {
			break;
		}
		patternId = currId % requestCount;

		result.Resource = resources[patternId];
		startT = std::chrono::high_resolution_clock::now();
		do {
			try {
				tcpClient.connect();

				tcpClient.execute(requests[patternId]);

				tcpClient.close();
			} catch(boost::system::system_error &e) {
				tcpClient.close();
				continue;
			}
			break;
		} while(true);
		endT = std::chrono::high_resolution_clock::now();
		diff = endT - startT;
		result.timeTaken = diff.count();
		results[workerId].emplace_back(std::move(result));
	} while(true);
}

std::vector<std::string> splitResources(const std::string & s) {
	std::vector<std::string> out;
	size_t skip_n = 0;
	std::string a = s;
	size_t index_of = std::string::npos;
	do {
		index_of = a.find_first_of(',', skip_n);

		if(index_of != std::string::npos) {
			out.push_back(a.substr(skip_n, index_of - skip_n));
			skip_n = index_of + 1;
		}

	} while(index_of != std::string::npos);

	out.push_back(a.substr(skip_n));

	return out;
}

int main(int argc, char *argv[]) {

	if(argc < 4) {
		std::cout << "N C EP arguments are required." << std::endl;
		return 1;
	}

	N = atoi(argv[1]);
	C = atoi(argv[2]);
	std::vector<std::string> eps = splitResources(argv[3]);
	requestCount = eps.size();

	requests = new std::string[eps.size()];
	resources = new std::string[eps.size()];
	results = new std::vector<TestResult>[C];

	for(int i = 0; i < C; ++i) {
		results[i].reserve(N);
	}

	for(int i = 0; i < eps.size(); ++i) {
		resources[i] = eps[i];
		requests[i] = std::string{ "GET /index.php?" } + eps[i] + std::string{ " HTTP/1.1\r\nHost: 192.168.0.227\r\nAccept: text/html\r\n\r\n" };
	}

	auto startTime = std::chrono::high_resolution_clock::now();
	
	std::vector<std::thread> workers;

	for(int i = 0; i < C; ++i) {
		workers.emplace_back([i]() -> void {
			WorkerMethod(i);
		});
	}

	for(int i = 0; i < C; ++i) {
		workers[i].join();
	}

	std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now() - startTime;

	double average = 0.0;
	double sd = 0.0;
	double rps = (double)N / diff.count();

	for(int i = 0; i < C; ++i) {
		std::vector<TestResult> & res = results[i];
		for(int j = 0; j < res.size(); ++j) {
			average += res[j].timeTaken;
		}
	}

	average /= (double)N;

	for(int i = 0; i < C; ++i) {
		std::vector<TestResult> & res = results[i];
		for(int j = 0; j < res.size(); ++j) {
			sd += (average - res[j].timeTaken) * (average - res[j].timeTaken);
		}
	}
	sd /= (double)N;
	sd = sqrt(sd);

	std::cout << rps << " " << average << " " << sd << std::endl;

	delete[] requests;
	delete[] resources;
	delete[] results;

	return 0;
}
