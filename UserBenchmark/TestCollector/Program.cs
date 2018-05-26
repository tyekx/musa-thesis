using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace TestCollector {
    class Test {
        public string Method;
        public string Resource;
        public string LoadBalancer;
        public string N;
        public string C;

        public string RPS;
        public string Mean;
        public string SD;
        public string C1;
        public string C2;
        public string C3;
    }

    class Program {
        static void Main(string[] args) {
            string testF = @"C:\work\webs\TestResults";
           
            if(args.Length == 0) {
                Console.WriteLine("An output file must be specified.");
                return;
            }

            string outFile = testF + "\\" + args[0];


            DirectoryInfo testDir = new DirectoryInfo(testF);

            DirectoryInfo[] tests = testDir.GetDirectories();

            List<Test> results = new List<Test>();

            foreach(DirectoryInfo d in tests) {
                Test t = new Test();

                string[] data = d.Name.Split('_');
                try {
                    t.Method = data[0];
                    t.Resource = data[1];
                    t.LoadBalancer = data[2];
                    t.N = data[3];
                    t.C = data[4];

                    string[] resultsFile = File.ReadAllLines(d.FullName + "\\" + d.Name + "_res.txt");
                    string[] res = resultsFile[0].Split(' ');

                    t.RPS = res[0];
                    t.Mean = res[1];
                    t.SD = res[2];
                } catch(Exception e) {
                    continue;
                }

                results.Add(t);
            }

            StreamWriter sw = new StreamWriter(outFile);

            foreach(Test t in results) {
                sw.WriteLine("{0},{1},{2},{3},{4},{5},{6},{7}", t.Method, t.Resource, t.LoadBalancer, t.N, t.C, t.RPS, t.Mean, t.SD);
            }

            sw.Close();
        }
    }
}
