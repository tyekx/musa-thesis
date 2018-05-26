run() {
    N=$1
    C=$2
    METHOD=$3
    EPS=$4
    RESET=$5
    LOGCAT=$6
    AB=$7
    PREFIX=$8
    DIAGS=$9
    DEFAULTFOLDER="C:/work/webs/TestResults"
    TESTNAME="${PREFIX}_${METHOD}_${N}_${C}"
    TESTFOLDER="$DEFAULTFOLDER/$TESTNAME"
    ABPATH="/c/xampp/apache/bin/ab.exe"
    UBPATH="/c/work/webs/UserBenchmark/UserBenchmark/x64/Debug/UserBenchmark.exe"
    LOGCATPATH="/c/work/webs/UserBenchmark/LogCat/bin/Debug/LogCat.exe"
    GETLOGSCRIPT="/c/work/webs/aw/win_getlog.sh"
    LOGFILE="$TESTFOLDER/log.txt"
    RESFILE="${TESTFOLDER}/${TESTNAME}_res.txt"
    ISAI=0
    RESULT=""
    BENCHMARKRESULT=""

    echo "Running test: $TESTNAME"

    echo -n "Server reset: "
    if [[ $RESET == 1 ]]; 
    then    
        echo "YES"
        ssh root@192.168.0.227 /usr/local/apache2/bin/apachectl stop
        ssh root@192.168.0.227 "rm /usr/local/apache2/logs/error_log"
        ssh tyekx@192.168.0.227 "/home/tyekx/work/webs/aw/proxy_config.sh $METHOD 10 134 170 253 > /home/tyekx/work/webs/aw/proxy.conf"
        SILANCE=`ssh tyekx@192.168.0.227 /home/tyekx/work/webs/aw/build.sh`
        ssh root@192.168.0.227 /usr/local/apache2/bin/apachectl start
    else
        echo "NO"
    fi

    echo -n "Used method: "
    if [[ $METHOD == "ai" ]];
    then
        ISAI=1
    fi
    echo "$METHOD"
    
    echo -n "Tester suite: "
    if [[ $AB == 1 ]]; 
    then
        echo "Apache Benchmark";
        if [[ $EPS = *","* ]];
        then
            echo "ERROR: you cant invoke Apache with multiple resources."
        else
            $ABPATH -n $N -c $C -l "http://192.168.0.227/index.php?$EPS" > testresult.txt
            RPS=`awk -F " " '/Requests per second/ {print $4}' testresult.txt`
            MEANSD=`awk -F " " '/Total:/ {print $3 " " $4}' testresult.txt`
            RESULT="$RPS $MEANSD"
        fi
    else
        echo "User Benchmark";

        RESULT=`$UBPATH $N $C $EPS`
    fi
    
    echo -n "using LogCat: "
    if [[ $LOGCAT == 1 ]]; 
    then
        echo "YES"
        
        echo -n "Checking test folder: "
    
        if [ -d "$TESTFOLDER" ]; then
            echo "ERROR, exists."
            exit 1
        fi
        echo "OK"

        mkdir $TESTFOLDER

        echo $RESULT > $RESFILE
        
        echo "Saving LogFile"
        $GETLOGSCRIPT "$LOGFILE"
        $LOGCATPATH "$LOGFILE" $ISAI $EPS $N "$TESTFOLDER" "$TESTNAME"
        rm "$LOGFILE"

        echo -n "Creating diagrams: "

        if [[ $DIAGS == 1 ]]; then
            echo "YES"

            EPCOUNT=`echo "$EPS" | awk -F, '{print NF}'`

            if [[ $EPCOUNT -gt 1 ]]; then
                for i in `seq 1 $EPCOUNT`
                do
                    RESOURCEID=`echo "$EPS" | awk -F, -v id=$i '{print $id}'`

                    RESOURCEFILE="${TESTFOLDER}/${TESTNAME}_resource${RESOURCEID}.csv"
                    ORD="${TESTFOLDER}/${TESTNAME}_resource${RESOURCEID}_diag.pdf"
                    DIAGTITLE="Terhelési diagram, M=$RESOURCEID, $METHOD"
                    gnuplot -e "SOURCE='${RESOURCEFILE}'; DEST='${ORD}'; TITLE='${DIAGTITLE}'" load_table.plg
                done
            fi

            if [[ $METHOD == "ai" ]]; then
                ETTABLE="${TESTFOLDER}/${TESTNAME}_et.csv"
                ETDIAG="${TESTFOLDER}/${TESTNAME}_et_diag.pdf"
                END=$((EPCOUNT + 2))
                ETDIAGTITLE="Becslési diagram, EP=[$EPS], $METHOD"
                
                echo  "array EPS[$EPCOUNT]" > runnable_et_table.plg

                for r in `seq 1 $EPCOUNT`
                do
                    RESOURCEID=`echo "$EPS" | awk -F, -v id=$r '{print $id}'`
                    echo "EPS[$r] = $RESOURCEID" >> runnable_et_table.plg
                done

                cat ai_et_table.plg >> runnable_et_table.plg

                gnuplot -e "SOURCE='${ETTABLE}'; DEST='${ETDIAG}'; TITLE='${ETDIAGTITLE}'; END=${END}" runnable_et_table.plg

                rm runnable_et_table.plg

                PROXYLTSOURCE="${TESTFOLDER}/${TESTNAME}_all.csv"
                PROXYLTDIAG="${TESTFOLDER}/${TESTNAME}_pm_diag.pdf"
                PROXYLTTITLE="Proxy által modellezett terhelések, EP=[$EPS], $METHOD"

                gnuplot -e "SOURCE='${PROXYLTSOURCE}'; DEST='${PROXYLTDIAG}'; TITLE='${PROXYLTTITLE}'" ai_load_table.plg
            fi

            LTTABLE="${TESTFOLDER}/${TESTNAME}_all.csv"
            LTDIAG="${TESTFOLDER}/${TESTNAME}_all_diag.pdf"
            NM="Terhelési diagram, EP=[$EPS], $METHOD"

            gnuplot -e "SOURCE='${LTTABLE}'; DEST='${LTDIAG}'; TITLE='${NM}'" load_table.plg

        else
            echo "NO"
        fi

    else
        echo "NO"
    fi

    
}

# 1: N
# 2: C
# 3: method
# 4: EP
# 5: RESET?
# 6: LOGCAT?
# 7: AB?
# 8: PREFIX
# 9: DIAGS?

run 1000 10 bybusyness 1 1 1 1 a0_0 1
run 1000 10 bybusyness 1 0 1 1 a0_1 1
run 1000 10 bybusyness 1 0 1 1 a0_2 1
run 1000 10 bybusyness 1 0 1 1 a0_3 1
run 1000 10 bybusyness 1 0 1 1 a0_4 1
run 1000 10 bybusyness 1 0 1 1 a0_5 1
run 1000 10 bybusyness 1 0 1 1 a0_6 1
run 1000 10 bybusyness 1 0 1 1 a0_7 1
run 1000 10 bybusyness 1 0 1 1 a0_8 1
run 1000 10 bybusyness 1 0 1 1 a0_9 1

run 1000 20 bybusyness 1 1 1 1 a0_0 1
run 1000 20 bybusyness 1 0 1 1 a0_1 1
run 1000 20 bybusyness 1 0 1 1 a0_2 1
run 1000 20 bybusyness 1 0 1 1 a0_3 1
run 1000 20 bybusyness 1 0 1 1 a0_4 1
run 1000 20 bybusyness 1 0 1 1 a0_5 1
run 1000 20 bybusyness 1 0 1 1 a0_6 1
run 1000 20 bybusyness 1 0 1 1 a0_7 1
run 1000 20 bybusyness 1 0 1 1 a0_8 1
run 1000 20 bybusyness 1 0 1 1 a0_9 1

run 1000 50 bybusyness 1 1 1 1 a0_0 1
run 1000 50 bybusyness 1 0 1 1 a0_1 1
run 1000 50 bybusyness 1 0 1 1 a0_2 1
run 1000 50 bybusyness 1 0 1 1 a0_3 1
run 1000 50 bybusyness 1 0 1 1 a0_4 1
run 1000 50 bybusyness 1 0 1 1 a0_5 1
run 1000 50 bybusyness 1 0 1 1 a0_6 1
run 1000 50 bybusyness 1 0 1 1 a0_7 1
run 1000 50 bybusyness 1 0 1 1 a0_8 1
run 1000 50 bybusyness 1 0 1 1 a0_9 1

run 5000 10 bybusyness 1 1 1 1 a0_0 1
run 5000 10 bybusyness 1 0 1 1 a0_1 1
run 5000 10 bybusyness 1 0 1 1 a0_2 1
run 5000 10 bybusyness 1 0 1 1 a0_3 1
run 5000 10 bybusyness 1 0 1 1 a0_4 1
run 5000 10 bybusyness 1 0 1 1 a0_5 1
run 5000 10 bybusyness 1 0 1 1 a0_6 1
run 5000 10 bybusyness 1 0 1 1 a0_7 1
run 5000 10 bybusyness 1 0 1 1 a0_8 1
run 5000 10 bybusyness 1 0 1 1 a0_9 1

run 5000 20 bybusyness 1 1 1 1 a0_0 1
run 5000 20 bybusyness 1 0 1 1 a0_1 1
run 5000 20 bybusyness 1 0 1 1 a0_2 1
run 5000 20 bybusyness 1 0 1 1 a0_3 1
run 5000 20 bybusyness 1 0 1 1 a0_4 1
run 5000 20 bybusyness 1 0 1 1 a0_5 1
run 5000 20 bybusyness 1 0 1 1 a0_6 1
run 5000 20 bybusyness 1 0 1 1 a0_7 1
run 5000 20 bybusyness 1 0 1 1 a0_8 1
run 5000 20 bybusyness 1 0 1 1 a0_9 1

run 5000 50 bybusyness 1 1 1 1 a0_0 1
run 5000 50 bybusyness 1 0 1 1 a0_1 1
run 5000 50 bybusyness 1 0 1 1 a0_2 1
run 5000 50 bybusyness 1 0 1 1 a0_3 1
run 5000 50 bybusyness 1 0 1 1 a0_4 1
run 5000 50 bybusyness 1 0 1 1 a0_5 1
run 5000 50 bybusyness 1 0 1 1 a0_6 1
run 5000 50 bybusyness 1 0 1 1 a0_7 1
run 5000 50 bybusyness 1 0 1 1 a0_8 1
run 5000 50 bybusyness 1 0 1 1 a0_9 1


run 10000 10 bybusyness 1 1 1 1 a0_0 1
run 10000 10 bybusyness 1 0 1 1 a0_1 1
run 10000 10 bybusyness 1 0 1 1 a0_2 1
run 10000 10 bybusyness 1 0 1 1 a0_3 1
run 10000 10 bybusyness 1 0 1 1 a0_4 1
run 10000 10 bybusyness 1 0 1 1 a0_5 1
run 10000 10 bybusyness 1 0 1 1 a0_6 1
run 10000 10 bybusyness 1 0 1 1 a0_7 1
run 10000 10 bybusyness 1 0 1 1 a0_8 1
run 10000 10 bybusyness 1 0 1 1 a0_9 1

run 10000 20 bybusyness 1 1 1 1 a0_0 1
run 10000 20 bybusyness 1 0 1 1 a0_1 1
run 10000 20 bybusyness 1 0 1 1 a0_2 1
run 10000 20 bybusyness 1 0 1 1 a0_3 1
run 10000 20 bybusyness 1 0 1 1 a0_4 1
run 10000 20 bybusyness 1 0 1 1 a0_5 1
run 10000 20 bybusyness 1 0 1 1 a0_6 1
run 10000 20 bybusyness 1 0 1 1 a0_7 1
run 10000 20 bybusyness 1 0 1 1 a0_8 1
run 10000 20 bybusyness 1 0 1 1 a0_9 1

run 10000 50 bybusyness 1 1 1 1 a0_0 1
run 10000 50 bybusyness 1 0 1 1 a0_1 1
run 10000 50 bybusyness 1 0 1 1 a0_2 1
run 10000 50 bybusyness 1 0 1 1 a0_3 1
run 10000 50 bybusyness 1 0 1 1 a0_4 1
run 10000 50 bybusyness 1 0 1 1 a0_5 1
run 10000 50 bybusyness 1 0 1 1 a0_6 1
run 10000 50 bybusyness 1 0 1 1 a0_7 1
run 10000 50 bybusyness 1 0 1 1 a0_8 1
run 10000 50 bybusyness 1 0 1 1 a0_9 1

# run 5000 50 bybusyness 0 1 1 1 ab0_0 1
# run 5000 50 bybusyness 0 0 1 1 ab0_1 1
# run 5000 50 bybusyness 0 0 1 1 ab0_2 1
# run 5000 50 bybusyness 0 0 1 1 ab0_3 1
# run 5000 50 bybusyness 0 0 1 1 ab0_4 1
# run 5000 50 bybusyness 0 0 1 1 ab0_5 1
# run 5000 50 bybusyness 0 0 1 1 ab0_6 1
# run 5000 50 bybusyness 0 0 1 1 ab0_7 1
# run 5000 50 bybusyness 0 0 1 1 ab0_8 1
# run 5000 50 bybusyness 0 0 1 1 ab0_9 1
# 
# run 5000 50 ai 0 1 1 1 ab0_0 1
# run 5000 50 ai 0 0 1 1 ab0_1 1
# run 5000 50 ai 0 0 1 1 ab0_2 1
# run 5000 50 ai 0 0 1 1 ab0_3 1
# run 5000 50 ai 0 0 1 1 ab0_4 1
# run 5000 50 ai 0 0 1 1 ab0_5 1
# run 5000 50 ai 0 0 1 1 ab0_6 1
# run 5000 50 ai 0 0 1 1 ab0_7 1
# run 5000 50 ai 0 0 1 1 ab0_8 1
# run 5000 50 ai 0 0 1 1 ab0_9 1
# 
# run 5000 50 bytraffic 0 1 1 1 ab0_0 1
# run 5000 50 bytraffic 0 0 1 1 ab0_1 1
# run 5000 50 bytraffic 0 0 1 1 ab0_2 1
# run 5000 50 bytraffic 0 0 1 1 ab0_3 1
# run 5000 50 bytraffic 0 0 1 1 ab0_4 1
# run 5000 50 bytraffic 0 0 1 1 ab0_5 1
# run 5000 50 bytraffic 0 0 1 1 ab0_6 1
# run 5000 50 bytraffic 0 0 1 1 ab0_7 1
# run 5000 50 bytraffic 0 0 1 1 ab0_8 1
# run 5000 50 bytraffic 0 0 1 1 ab0_9 1
# 
# run 5000 50 byrequests 0 1 1 1 ab0_0 1
# run 5000 50 byrequests 0 0 1 1 ab0_1 1
# run 5000 50 byrequests 0 0 1 1 ab0_2 1
# run 5000 50 byrequests 0 0 1 1 ab0_3 1
# run 5000 50 byrequests 0 0 1 1 ab0_4 1
# run 5000 50 byrequests 0 0 1 1 ab0_5 1
# run 5000 50 byrequests 0 0 1 1 ab0_6 1
# run 5000 50 byrequests 0 0 1 1 ab0_7 1
# run 5000 50 byrequests 0 0 1 1 ab0_8 1
# run 5000 50 byrequests 0 0 1 1 ab0_9 1
# 
# # 1
# 
# run 5000 50 bybusyness 1 1 1 1 ab1_0 1
# run 5000 50 bybusyness 1 0 1 1 ab1_1 1
# run 5000 50 bybusyness 1 0 1 1 ab1_2 1
# run 5000 50 bybusyness 1 0 1 1 ab1_3 1
# run 5000 50 bybusyness 1 0 1 1 ab1_4 1
# run 5000 50 bybusyness 1 0 1 1 ab1_5 1
# run 5000 50 bybusyness 1 0 1 1 ab1_6 1
# run 5000 50 bybusyness 1 0 1 1 ab1_7 1
# run 5000 50 bybusyness 1 0 1 1 ab1_8 1
# run 5000 50 bybusyness 1 0 1 1 ab1_9 1
# 
# run 5000 50 ai 1 1 1 1 ab1_0 1
# run 5000 50 ai 1 0 1 1 ab1_1 1
# run 5000 50 ai 1 0 1 1 ab1_2 1
# run 5000 50 ai 1 0 1 1 ab1_3 1
# run 5000 50 ai 1 0 1 1 ab1_4 1
# run 5000 50 ai 1 0 1 1 ab1_5 1
# run 5000 50 ai 1 0 1 1 ab1_6 1
# run 5000 50 ai 1 0 1 1 ab1_7 1
# run 5000 50 ai 1 0 1 1 ab1_8 1
# run 5000 50 ai 1 0 1 1 ab1_9 
# 
# run 5000 50 bytraffic 1 1 1 1 ab1_0 1
# run 5000 50 bytraffic 1 0 1 1 ab1_1 1
# run 5000 50 bytraffic 1 0 1 1 ab1_2 1
# run 5000 50 bytraffic 1 0 1 1 ab1_3 1
# run 5000 50 bytraffic 1 0 1 1 ab1_4 1
# run 5000 50 bytraffic 1 0 1 1 ab1_5 1
# run 5000 50 bytraffic 1 0 1 1 ab1_6 1
# run 5000 50 bytraffic 1 0 1 1 ab1_7 1
# run 5000 50 bytraffic 1 0 1 1 ab1_8 1
# run 5000 50 bytraffic 1 0 1 1 ab1_9 1
# 
# run 5000 50 byrequests 1 1 1 1 ab1_0 1
# run 5000 50 byrequests 1 0 1 1 ab1_1 1
# run 5000 50 byrequests 1 0 1 1 ab1_2 1
# run 5000 50 byrequests 1 0 1 1 ab1_3 1
# run 5000 50 byrequests 1 0 1 1 ab1_4 1
# run 5000 50 byrequests 1 0 1 1 ab1_5 1
# run 5000 50 byrequests 1 0 1 1 ab1_6 1
# run 5000 50 byrequests 1 0 1 1 ab1_7 1
# run 5000 50 byrequests 1 0 1 1 ab1_8 1
# run 5000 50 byrequests 1 0 1 1 ab1_9 1
# 
# # 0
# 
# run 5000 50 bybusyness 0 1 1 0 ub0_0 1
# run 5000 50 bybusyness 0 0 1 0 ub0_1 1
# run 5000 50 bybusyness 0 0 1 0 ub0_2 1
# run 5000 50 bybusyness 0 0 1 0 ub0_3 1
# run 5000 50 bybusyness 0 0 1 0 ub0_4 1
# run 5000 50 bybusyness 0 0 1 0 ub0_5 1
# run 5000 50 bybusyness 0 0 1 0 ub0_6 1
# run 5000 50 bybusyness 0 0 1 0 ub0_7 1
# run 5000 50 bybusyness 0 0 1 0 ub0_8 1
# run 5000 50 bybusyness 0 0 1 0 ub0_9 1
# 
# run 5000 50 ai 0 1 1 0 ub0_0 1
# run 5000 50 ai 0 0 1 0 ub0_1 1
# run 5000 50 ai 0 0 1 0 ub0_2 1
# run 5000 50 ai 0 0 1 0 ub0_3 1
# run 5000 50 ai 0 0 1 0 ub0_4 1
# run 5000 50 ai 0 0 1 0 ub0_5 1
# run 5000 50 ai 0 0 1 0 ub0_6 1
# run 5000 50 ai 0 0 1 0 ub0_7 1
# run 5000 50 ai 0 0 1 0 ub0_8 1
# run 5000 50 ai 0 0 1 0 ub0_9 
# 
# run 5000 50 bytraffic 0 1 1 0 ub0_0 1
# run 5000 50 bytraffic 0 0 1 0 ub0_1 1
# run 5000 50 bytraffic 0 0 1 0 ub0_2 1
# run 5000 50 bytraffic 0 0 1 0 ub0_3 1
# run 5000 50 bytraffic 0 0 1 0 ub0_4 1
# run 5000 50 bytraffic 0 0 1 0 ub0_5 1
# run 5000 50 bytraffic 0 0 1 0 ub0_6 1
# run 5000 50 bytraffic 0 0 1 0 ub0_7 1
# run 5000 50 bytraffic 0 0 1 0 ub0_8 1
# run 5000 50 bytraffic 0 0 1 0 ub0_9 1
# 
# run 5000 50 byrequests 0 1 1 0 ub0_0 1
# run 5000 50 byrequests 0 0 1 0 ub0_1 1
# run 5000 50 byrequests 0 0 1 0 ub0_2 1
# run 5000 50 byrequests 0 0 1 0 ub0_3 1
# run 5000 50 byrequests 0 0 1 0 ub0_4 1
# run 5000 50 byrequests 0 0 1 0 ub0_5 1
# run 5000 50 byrequests 0 0 1 0 ub0_6 1
# run 5000 50 byrequests 0 0 1 0 ub0_7 1
# run 5000 50 byrequests 0 0 1 0 ub0_8 1
# run 5000 50 byrequests 0 0 1 0 ub0_9 1
# 
# # 1
# 
# 
# run 5000 50 bybusyness 1 1 1 0 ub1_0 1
# run 5000 50 bybusyness 1 0 1 0 ub1_1 1
# run 5000 50 bybusyness 1 0 1 0 ub1_2 1
# run 5000 50 bybusyness 1 0 1 0 ub1_3 1
# run 5000 50 bybusyness 1 0 1 0 ub1_4 1
# run 5000 50 bybusyness 1 0 1 0 ub1_5 1
# run 5000 50 bybusyness 1 0 1 0 ub1_6 1
# run 5000 50 bybusyness 1 0 1 0 ub1_7 1
# run 5000 50 bybusyness 1 0 1 0 ub1_8 1
# run 5000 50 bybusyness 1 0 1 0 ub1_9 1
# 
# run 5000 50 ai 1 1 1 0 ub1_0 1
# run 5000 50 ai 1 0 1 0 ub1_1 1
# run 5000 50 ai 1 0 1 0 ub1_2 1
# run 5000 50 ai 1 0 1 0 ub1_3 1
# run 5000 50 ai 1 0 1 0 ub1_4 1
# run 5000 50 ai 1 0 1 0 ub1_5 1
# run 5000 50 ai 1 0 1 0 ub1_6 1
# run 5000 50 ai 1 0 1 0 ub1_7 1
# run 5000 50 ai 1 0 1 0 ub1_8 1
# run 5000 50 ai 1 0 1 0 ub1_9 
# 
# run 5000 50 bytraffic 1 1 1 0 ub1_0 1
# run 5000 50 bytraffic 1 0 1 0 ub1_1 1
# run 5000 50 bytraffic 1 0 1 0 ub1_2 1
# run 5000 50 bytraffic 1 0 1 0 ub1_3 1
# run 5000 50 bytraffic 1 0 1 0 ub1_4 1
# run 5000 50 bytraffic 1 0 1 0 ub1_5 1
# run 5000 50 bytraffic 1 0 1 0 ub1_6 1
# run 5000 50 bytraffic 1 0 1 0 ub1_7 1
# run 5000 50 bytraffic 1 0 1 0 ub1_8 1
# run 5000 50 bytraffic 1 0 1 0 ub1_9 1
# 
# run 5000 50 byrequests 1 1 1 0 ub1_0 1
# run 5000 50 byrequests 1 0 1 0 ub1_1 1
# run 5000 50 byrequests 1 0 1 0 ub1_2 1
# run 5000 50 byrequests 1 0 1 0 ub1_3 1
# run 5000 50 byrequests 1 0 1 0 ub1_4 1
# run 5000 50 byrequests 1 0 1 0 ub1_5 1
# run 5000 50 byrequests 1 0 1 0 ub1_6 1
# run 5000 50 byrequests 1 0 1 0 ub1_7 1
# run 5000 50 byrequests 1 0 1 0 ub1_8 1
# run 5000 50 byrequests 1 0 1 0 ub1_9 1
# 
# # 1,2,3
# 
# run 5000 50 bybusyness 1,2,3 1 1 0 ub123_0 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_1 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_2 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_3 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_4 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_5 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_6 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_7 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_8 1
# run 5000 50 bybusyness 1,2,3 0 1 0 ub123_9 1
# 
# run 5000 50 ai 1,2,3 1 1 0 ub123_0 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_1 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_2 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_3 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_4 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_5 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_6 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_7 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_8 1
# run 5000 50 ai 1,2,3 0 1 0 ub123_9 1
# 
# run 5000 50 bytraffic 1,2,3 1 1 0 ub123_0 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_1 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_2 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_3 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_4 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_5 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_6 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_7 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_8 1
# run 5000 50 bytraffic 1,2,3 0 1 0 ub123_9 1
# 
# run 5000 50 byrequests 1,2,3 1 1 0 ub123_0 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_1 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_2 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_3 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_4 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_5 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_6 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_7 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_8 1
# run 5000 50 byrequests 1,2,3 0 1 0 ub123_9 1
# 
# # 1,1,2
# 
# run 5000 50 bybusyness 1,1,2 1 1 0 ub112_0 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_1 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_2 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_3 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_4 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_5 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_6 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_7 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_8 1
# run 5000 50 bybusyness 1,1,2 0 1 0 ub112_9 1
# 
# run 5000 50 ai 1,1,2 1 1 0 ub112_0 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_1 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_2 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_3 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_4 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_5 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_6 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_7 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_8 1
# run 5000 50 ai 1,1,2 0 1 0 ub112_9 1
# 
# run 5000 50 bytraffic 1,1,2 1 1 0 ub112_0 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_1 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_2 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_3 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_4 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_5 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_6 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_7 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_8 1
# run 5000 50 bytraffic 1,1,2 0 1 0 ub112_9 1

# run 5000 50 byrequests 1,1,2 1 1 0 ub112_0 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_1 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_2 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_3 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_4 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_5 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_6 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_7 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_8 1
# run 5000 50 byrequests 1,1,2 0 1 0 ub112_9 1
# 
# # 1,2,2
# 
# run 5000 50 bybusyness 1,2,2 1 1 0 ub122_0 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_1 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_2 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_3 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_4 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_5 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_6 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_7 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_8 1
# run 5000 50 bybusyness 1,2,2 0 1 0 ub122_9 1
# 
# run 5000 50 ai 1,2,2 1 1 0 ub122_0 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_1 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_2 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_3 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_4 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_5 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_6 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_7 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_8 1
# run 5000 50 ai 1,2,2 0 1 0 ub122_9 1
# 
# run 5000 50 bytraffic 1,2,2 1 1 0 ub122_0 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_1 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_2 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_3 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_4 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_5 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_6 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_7 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_8 1
# run 5000 50 bytraffic 1,2,2 0 1 0 ub122_9 1
# 
# run 5000 50 byrequests 1,2,2 1 1 0 ub122_0 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_1 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_2 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_3 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_4 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_5 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_6 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_7 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_8 1
# run 5000 50 byrequests 1,2,2 0 1 0 ub122_9 1
# 
# 
# # 1,2
# 
# run 5000 50 bybusyness 1,2 1 1 0 ub12_0 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_1 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_2 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_3 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_4 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_5 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_6 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_7 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_8 1
# run 5000 50 bybusyness 1,2 0 1 0 ub12_9 1
# 
# run 5000 50 ai 1,2 1 1 0 ub12_0 1
# run 5000 50 ai 1,2 0 1 0 ub12_1 1
# run 5000 50 ai 1,2 0 1 0 ub12_2 1
# run 5000 50 ai 1,2 0 1 0 ub12_3 1
# run 5000 50 ai 1,2 0 1 0 ub12_4 1
# run 5000 50 ai 1,2 0 1 0 ub12_5 1
# run 5000 50 ai 1,2 0 1 0 ub12_6 1
# run 5000 50 ai 1,2 0 1 0 ub12_7 1
# run 5000 50 ai 1,2 0 1 0 ub12_8 1
# run 5000 50 ai 1,2 0 1 0 ub12_9 1
# 
# run 5000 50 bytraffic 1,2 1 1 0 ub12_0 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_1 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_2 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_3 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_4 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_5 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_6 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_7 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_8 1
# run 5000 50 bytraffic 1,2 0 1 0 ub12_9 1
# 
# run 5000 50 byrequests 1,2 1 1 0 ub12_0 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_1 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_2 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_3 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_4 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_5 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_6 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_7 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_8 1
# run 5000 50 byrequests 1,2 0 1 0 ub12_9 1
