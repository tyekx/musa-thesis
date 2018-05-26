using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace LogCat {
    class Program {
        static void Main(string[] args) {

            if(args.Length < 6) {
                Console.WriteLine("Usage: INFILE isAI EPS N OUTPUTFOLDER PATTERN");
                return;
            }

            string inFile = args[0];
            bool isAI = Convert.ToInt32(args[1]) == 1;
            List<string> resources = new List<string>();
            resources.AddRange(args[2].Split(','));
            int N = Convert.ToInt32(args[3]);
            string outFolder = args[4].Trim('/').Trim('\\');
            string pattern = args[5];

            LogCat lc = new LogCat(inFile, N);

            lc.ParseLogFile();

            lc.SaveLoadTable(outFolder + "\\" + pattern, resources);

            if(isAI) {
                lc.SaveEstimationTable(outFolder + "\\" + pattern + "_et.csv", resources);
            }

            lc.SaveStats(outFolder + "\\" + pattern + "_stats.csv", resources);
        }
    }
}
