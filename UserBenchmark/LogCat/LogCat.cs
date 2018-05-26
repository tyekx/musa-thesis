using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace LogCat {

    public class LogEntry {
        public int Wid { get; set; }
        public int EstimatedLoad { get; set; }
        public string Resource { get; set; }

        public long TPS { get; set; } // proxy start
        public long TWS { get; set; } // worker start
        public long TWE { get; set; } // worker end
        public long TPE { get; set; } // proxy end
        public long PTT { get; set; } // total time
        public long PQT { get; set; } // queue time
        public long PPT { get; set; } // process time
        public long PAT { get; set; } // admin time

        public int RowId { get; set; }
        public int Q { get; set; }
        public int RequestCount { get; set; }
        public int PrevPK { get; set; }
        public int CurrPK { get; set; }
        public int DeltaPK { get; set; }
    }

    class TableEntry {
        public LogEntry Le { get; set; }
        public long Id { get; set; }
        public long Sign { get; set; }

        public TableEntry(LogEntry le, long id, long p) {
            Le = le;
            Id = id;
            Sign = p;
        }
    }

    class StatEntry {
        public int N = 0;

        public string EP;

        public double TT_mean { get; set; }
        public double TT_sd { get; set; }

        public double QT_mean { get; set; }
        public double QT_sd { get; set; }

        public double PT_mean { get; set; }
        public double PT_sd { get; set; }

        public double AT_mean { get; set; }
        public double AT_sd { get; set; }

        public void AddMeans(LogEntry le) {
            ++N;
            TT_mean += (double)le.PTT;
            QT_mean += (double)le.PQT;
            PT_mean += (double)le.PPT;
            AT_mean += (double)le.PAT;
        }

        public void CalculateMeans(double RC) {
            TT_mean /= RC;
            QT_mean /= RC;
            PT_mean /= RC;
            AT_mean /= RC;
        }

        public void AddSDs(LogEntry le) {
            TT_sd += (TT_mean - le.PTT) * (TT_mean - le.PTT);
            QT_sd += (QT_mean - le.PQT) * (QT_mean - le.PQT);
            PT_sd += (PT_mean - le.PPT) * (PT_mean - le.PPT);
            AT_sd += (AT_mean - le.PAT) * (AT_mean - le.PAT);
        }

        public void CalculateSDs(double RC) {
            TT_sd = Math.Sqrt(TT_sd / RC);
            QT_sd = Math.Sqrt(QT_sd / RC);
            PT_sd = Math.Sqrt(PT_sd / RC);
            AT_sd = Math.Sqrt(AT_sd / RC);
        }

        public void CalculateCorrectedSDs(double RC) {
            double corrected = RC - 1;
            TT_sd = Math.Sqrt(TT_sd / corrected);
            QT_sd = Math.Sqrt(QT_sd / corrected);
            PT_sd = Math.Sqrt(PT_sd / corrected);
            AT_sd = Math.Sqrt(AT_sd / corrected);
        }
    }

    public class EstimationTable {
        StreamWriter File;

        List<TableEntry> Entries = new List<TableEntry>();
        List<string> Eps;

        public EstimationTable(string path, List<string> eps) {
            File = new StreamWriter(path);
            Eps = eps;
        }

        public void Add(LogEntry le) {
            Entries.Add(new TableEntry(le, le.TPS, 1));
        }

        public void Save() {
            Entries.Sort((TableEntry a, TableEntry b) => {
                return (int)(a.Id - b.Id);
            });

            int[] Epvek = new int[Eps.Count];
            for(int i = 0; i < Eps.Count; ++i) {
                Epvek[i] = 5000;
            }

            long T0 = Entries[0].Id;

            foreach(TableEntry e in Entries) {
                long Tx = e.Id - T0;
                for(int i = 0; i < Eps.Count; ++i) {
                    if(e.Le.Resource == Eps[i]) {
                        Epvek[i] = e.Le.CurrPK;
                    }
                }

                File.Write("{0},{1}", Tx, e.Id);

                foreach(int epvalue in Epvek) {
                    File.Write(",{0}", epvalue);
                }
                File.WriteLine();
            }
            File.Close();
        }
    }

    public class LoadTable {
        StreamWriter File;



        List<TableEntry> Entries = new List<TableEntry>();

        public LoadTable(string fileName) {
            File = new StreamWriter(fileName);
        }

        public void Add(LogEntry le) {
            Entries.Add(new TableEntry(le, le.TPS, 1));
            Entries.Add(new TableEntry(le, le.TPE, -1));
        }

        public void Save() {
            Entries.Sort((TableEntry a, TableEntry b) => {
                return (int)(a.Id - b.Id);
            });

            long T0 = Entries[0].Id;

            long[] Lvek = new long[3] { 0, 0, 0 };
            long[] Cvek = new long[3] { 0, 0, 0 };

            foreach(TableEntry e in Entries) {
                long id = e.Id - T0;

                Lvek[e.Le.Wid] += e.Sign * e.Le.EstimatedLoad;
                Cvek[e.Le.Wid] += e.Sign;

                File.WriteLine("{0},{1},{2},{3},{4},{5},{6},{7}",
                                id, e.Id,
                                Lvek[0], Lvek[1], Lvek[2],
                                Cvek[0], Cvek[1], Cvek[2]);
            }

            File.Close();
        }
    }

    public class LogCat {

        List<LogEntry> Logs = new List<LogEntry>();

        public string LogFilePath { get; set; }
        public int N { get; set; }
        public LogCat(string lfp, int n) {
            LogFilePath = lfp;
            N = n;
        }

        public void SaveLoadTable(string filePath, List<string> resources) {
            if(Logs.Count == 0) {
                Console.WriteLine("[WARNING] LogEntry list was empty.");
                return;
            }
            LoadTable allLt = new LoadTable(filePath + "_all.csv");

            HashSet<string> uniqueEps = new HashSet<string>(resources);

            Dictionary<string, LoadTable> epLts = new Dictionary<string, LoadTable>();

            if(uniqueEps.Count > 1) {
                foreach(string s in uniqueEps) {
                    epLts[s] = new LoadTable(filePath + $"_resource{s}.csv");
                }
            }

            foreach(LogEntry i in Logs) {
                allLt.Add(i);
                if(uniqueEps.Count > 1) {
                    epLts[i.Resource].Add(i);
                }
            }
            allLt.Save();

            if(uniqueEps.Count > 1) {
                foreach(var s in epLts) {
                    s.Value.Save();
                }
            }
        }

        public void SaveEstimationTable(string filePath, List<string> resources) {
            if(Logs.Count == 0) {
                Console.WriteLine("[WARNING] LogEntry list was empty.");
                return;
            }
            EstimationTable et = new EstimationTable(filePath, resources);

            foreach(LogEntry i in Logs) {
                et.Add(i);
            }

            et.Save();
        }

        public void SaveStats(string filePath, List<string> eps) {
            StreamWriter sw = new StreamWriter(filePath);
            /*
             * | ep | TT mean | TT sd | QT mean | QT sd | PT mean | PT sd | AT mean | AT sd
             */
            int seCount = eps.Count + 1;
            StatEntry[] se = new StatEntry[eps.Count + 1];

            for(int i = 0; i < seCount; ++i) {
                se[i] = new StatEntry();
            }

            foreach(LogEntry e in Logs) {
                for(int i = 0; i <= eps.Count; ++i) {
                    if(i == 0 || eps[i - 1] == e.Resource) {
                        se[i].EP = (i == 0) ? "all" : eps[i - 1];
                        se[i].AddMeans(e);
                    }
                }
            }

            foreach(StatEntry s in se) {
                s.CalculateMeans((double)s.N);
            }

            foreach(LogEntry e in Logs) {
                for(int i = 0; i <= eps.Count; ++i) {
                    if(i == 0 || eps[i - 1] == e.Resource) {
                        se[i].AddSDs(e);
                    }
                }
            }


            for(int i = 0; i <= eps.Count; ++i) {
                if(eps.Count > 1) {
                    se[i].CalculateCorrectedSDs((double)se[i].N);
                } else {
                    se[i].CalculateSDs((double)se[i].N);
                }
                sw.WriteLine($"{se[i].EP},{se[i].N},{se[i].TT_mean},{se[i].TT_sd},{se[i].QT_mean},{se[i].QT_sd},{se[i].PT_mean},{se[i].PT_sd},{se[i].AT_mean},{se[i].AT_sd}");
            }

            sw.Close();
        }

        public void ParseLogFile() {
            string[] allText = File.ReadAllLines(LogFilePath);

            foreach(string line in allText) {
                if(line.IndexOf("[OUT]") != -1) {
                    string[] values = line.Substring(line.IndexOf('@') + 1).Split(' ');
                    LogEntry le = new LogEntry();

                    le.Wid = Convert.ToInt32(values[0]);
                    le.EstimatedLoad = Convert.ToInt32(values[1]);
                    le.Resource = values[2];

                    le.TPS = Convert.ToInt64(values[3]);
                    le.TWS = Convert.ToInt64(values[4]);
                    le.TWE = Convert.ToInt64(values[5]);
                    le.TPE = Convert.ToInt64(values[6]);
                    le.PTT = Convert.ToInt64(values[7]);
                    le.PQT = Convert.ToInt64(values[8]);
                    le.PPT = Convert.ToInt64(values[9]);
                    le.PAT = Convert.ToInt64(values[10]);

                    le.RowId = Convert.ToInt32(values[11]);
                    le.Q = Convert.ToInt32(values[12]);
                    le.RequestCount = Convert.ToInt32(values[13]);
                    le.PrevPK = Convert.ToInt32(values[14]);
                    le.CurrPK = Convert.ToInt32(values[15]);
                    le.DeltaPK = Convert.ToInt32(values[16]);

                    Logs.Add(le);
                }
            }
            // keep the last N
            Logs.RemoveRange(0, Logs.Count - N);
        }
    }
}
