<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Escalado de Rendimiento - Servidor HTTP Apache Versi�n 2.5</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" /><link rel="stylesheet" type="text/css" href="../style/css/prettify.css" />
<script src="../style/scripts/prettify.min.js" type="text/javascript">
</script>

<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body id="manual-page"><div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/quickreference.html">Directivas</a> | <a href="http://wiki.apache.org/httpd/FAQ">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa del sitio web</a></p>
<p class="apache">Versi�n 2.5 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.png" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.5</a> &gt; <a href="./">Documentaci�n diversa</a></div><div id="page-content"><div id="preamble"><h1>Escalado de Rendimiento</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/misc/perf-scaling.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/misc/perf-scaling.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/misc/perf-scaling.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div>

        <p>La p�gina de ajuste de rendimiento en la documentaci�n de Apache 1.3 dice:</p>

        <blockquote><p>
            "Apache es un servidor web gen�rico, que primero est� est� dise�ado para ser correcto, y segundo para ser r�pido. Aun as�, su rendimiento es bastante satisfactorio. La mayor�a de los sitios web tienen menos de 10Mbits de ancho de banda de salida, que Apache puede utilizar con tan solo un servidor web que use un Pentium de gama baja."</p></blockquote>

        <p>Aun as�, esta frase se escribi� hace unos cuantos a�os, y desde entonces han ocurrido muchas cosas. Por un lado, el hardware para servidores web se ha vuelto mucho m�s r�pido. Por otro lado, a muchos sitios web ahora se les permite usar mucho m�s que diez megabits de ancho de banda de salida. Adem�s, las aplicaciones web se han vuelto m�s complejas. La p�gina t�pica de contenido est�tico sigue existiendo, pero la web ha crecido sustancialmente como una plataforma de computaci�n y los webmasters acaban ejecutando contenido din�mico en perl, PHP, o JAVA, los cuales afectan al rendimiento.</p>

        <p>Por lo tanto, a pesar de los avances en velocidad del hardware y el crecimiento del ancho de banda, el rendimiento del servidor web y el rendimiento de las aplicaciones web siguen siendo temas de inter�s. En esta documentaci�n, se hablar� de muchos aspectos del rendimiento del servidor web.</p>
    </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="../images/down.gif" /> <a href="#what-will-and-will-not-be-discussed">De qu� hablaremos y de qu� no</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#monitoring-your-server">Monitorizando Su Servidor</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#configuring-for-performance">Configurar para obtener Rendimiento</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#caching-content">Cacheando Contenido</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#further-considerations">Otras Consideraciones</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><a href="#comments_section">Comentarios</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="what-will-and-will-not-be-discussed" id="what-will-and-will-not-be-discussed">De qu� hablaremos y de qu� no</a></h2>
        

        <p>Este documento se centrar� en documentaci�n de f�cil acceso y opciones de ajuste para Apache HTTPD 2.2 y 2.4, as� como herramientas de monitorizaci�n. Las herramientas de monitorizaci�n le permiten observar su servidor web para obtener informaci�n de su rendimiento, o su falta de �l. Asumiremos que usted no tiene un presupuesto ilimitado para hardware de servidor, as� que la infraestructura existente tiene que hacer el trabajo. Usted probablemente tampoco desea compilar su propio Apache, o recompilar el kernel del sistema operativo. Aunque si asumimos que est� familiarizado con el fichero de configuraci�n de Apache httpd.</p>
    </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="monitoring-your-server" id="monitoring-your-server">Monitorizando Su Servidor</a></h2>
        

        <p>La primera tarea cuando se mide o se ajusta el rendimiento de su servidor es averiguar como est� rindiendo actualmente. Monitorizando su servidor con  carga real, o carga generada artificialmente, puede extrapolar su comportamiento bajo estr�s, como por ejemplo cuando se le menciona en Slashdot.</p>

        <h3><a name="monitoring-tools" id="monitoring-tools">Herramientas de Monitorizaci�n</a></h3>
            

            <h4><a name="top" id="top">top</a></h4>
                

                <p>La herramienta top va incluida en Linux y FreeBSD. Solaris ofrece <code>prstat(1)</code>. �sta recolecta una serie de estad�sticas para el sistema de cada proceso que se est� ejecutando, y despu�s los muestra en su terminal. Los datos que se muestran se refrescan cada segundo y dependen de cada plataforma, pero generalmente incluye la carga general del sistema, n�mero de procesos y su estado actual, el porcentaje de tiempo de CPU(s) utilizado ejecutando c�digo de usuario o sistema, y el estado de la memoria virtual del sistema. Los datos que se muestran para cada proceso generalmente se pueden configurar e incluyen su nombre de proceso e ID, prioridad y valor "nice", uso de memoria y porcentaje de uso de CPU. El siguiente ejemplo muestra multiples procesos httpd (con MPM worker o event) corriendo en un sistema Linux (Xen):</p>

                <div class="example"><pre>top - 23:10:58 up 71 days,  6:14,  4 users,  load average: 0.25, 0.53, 0.47
Tasks: 163 total,   1 running, 162 sleeping,   0 stopped,   0 zombie
Cpu(s): 11.6%us,  0.7%sy,  0.0%ni, 87.3%id,  0.4%wa,  0.0%hi,  0.0%si,  0.0%st
Mem:   2621656k total,  2178684k used,   442972k free,   100500k buffers
Swap:  4194296k total,   860584k used,  3333712k free,  1157552k cached

  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
16687 example_  20   0 1200m 547m 179m S   45 21.4   1:09.59 httpd-worker
15195 www       20   0  441m  33m 2468 S    0  1.3   0:41.41 httpd-worker
    1 root      20   0 10312  328  308 S    0  0.0   0:33.17 init
    2 root      15  -5     0    0    0 S    0  0.0   0:00.00 kthreadd
    3 root      RT  -5     0    0    0 S    0  0.0   0:00.14 migration/0
    4 root      15  -5     0    0    0 S    0  0.0   0:04.58 ksoftirqd/0
    5 root      RT  -5     0    0    0 S    0  0.0   4:45.89 watchdog/0
    6 root      15  -5     0    0    0 S    0  0.0   1:42.52 events/0
    7 root      15  -5     0    0    0 S    0  0.0   0:00.00 khelper
   19 root      15  -5     0    0    0 S    0  0.0   0:00.00 xenwatch
   20 root      15  -5     0    0    0 S    0  0.0   0:00.00 xenbus
   28 root      RT  -5     0    0    0 S    0  0.0   0:00.14 migration/1
   29 root      15  -5     0    0    0 S    0  0.0   0:00.20 ksoftirqd/1
   30 root      RT  -5     0    0    0 S    0  0.0   0:05.96 watchdog/1
   31 root      15  -5     0    0    0 S    0  0.0   1:18.35 events/1
   32 root      RT  -5     0    0    0 S    0  0.0   0:00.08 migration/2
   33 root      15  -5     0    0    0 S    0  0.0   0:00.18 ksoftirqd/2
   34 root      RT  -5     0    0    0 S    0  0.0   0:06.00 watchdog/2
   35 root      15  -5     0    0    0 S    0  0.0   1:08.39 events/2
   36 root      RT  -5     0    0    0 S    0  0.0   0:00.10 migration/3
   37 root      15  -5     0    0    0 S    0  0.0   0:00.16 ksoftirqd/3
   38 root      RT  -5     0    0    0 S    0  0.0   0:06.08 watchdog/3
   39 root      15  -5     0    0    0 S    0  0.0   1:22.81 events/3
   68 root      15  -5     0    0    0 S    0  0.0   0:06.28 kblockd/0
   69 root      15  -5     0    0    0 S    0  0.0   0:00.04 kblockd/1
   70 root      15  -5     0    0    0 S    0  0.0   0:00.04 kblockd/2</pre></div>

                <p>Top es una gran herramienta incluso aunque consume algunos recursos (cuando se ejecuta, su propio proceso generalmente est� entre el top 10 de los que m�s usan CPU). Es indispensable para determinar el tama�o de los procesos que se est�n ejecutando, lo cual es bastante pr�ctico para determinar cuantos procesos de servidor puede ejecutar en su m�quina. C�mo hacer eso se describre en <a href="#sizing-MaxRequestWorkers">Dimensionando MaxRequestWorkers</a>. Top es, aun as�, una herramienta interactiva y ejecutarla continuamente tiene muy pocas o ninguna ventaja. (aunque actualmente tiene un modo no interactivo "-b")</p>
            

            <h4><a name="free" id="free">free</a></h4>
                

                <p>Este comando solo est� disponible en Linux. Muestra cuanta memoria y de swap hay en uso. Linux ubica la memoria no usada como un cach� de sistema de ficheros. El comando "free" muestra el uso de ambos sin esta cache. El comando free se puede usar para averiguar cuanta memoria est� usando el sistema operativo, como se describe en el p�rrafo <a href="#sizing-MaxRequestWorkers">Dimensionando MaxRequestWorkers</a>. El resultado del comando free parece algo como esto:</p>

                <div class="example"><pre>sctemme@brutus:~$ free
              total       used     free   shared    buffers    cached
Mem:        4026028    3901892   124136         0    253144    841044
-/+ buffers/cache:     2807704  1218324
Swap:       3903784      12540  3891244</pre></div>
            

            <h4><a name="vmstat" id="vmstat">vmstat</a></h4>
                

                <p>Este comando est� disponible en muchas plataformas de unix. Muestra un gran n�mero de m�tricas del sistema operativo. Ejecutado sin par�metros, muestra una linea del estado en ese momento. Cuando se a�ade un par�metro num�rico el estado se va refrescando en intervalos seg�n lo indicado. Por ejemplo,
                <code>vmstat 5</code> provoca que la informaci�n se refresque cada cinco segundos. Vmstat muestra la cantidad de memoria virtual en uso, cuanta memoria se est� paginando (swap) cada segundo, el n�mero de procesos ejecut�ndose y en estado "sleep", el n�mero de interrupciones, cambios de contexto por segundo y el porcentaje de uso de CPU.</p>

                <p>A continuaci�n se puede ver lo que muestra <code>vmstat</code> de un servidor sin actividad:</p>


                <div class="example"><pre>[sctemme@GayDeceiver sctemme]$ vmstat 5 3
   procs                      memory     swap         io    system        cpu
 r b w     swpd   free   buff cache si so       bi    bo in     cs us  sy id
 0 0 0        0 186252   6688 37516    0    0   12     5 47    311  0   1 99
 0 0 0        0 186244   6696 37516    0    0    0    16 41    314  0   0 100
 0 0 0        0 186236   6704 37516    0    0    0     9 44    314  0   0 100</pre></div>

                <p>Y esto es lo que muestra de un servidor que tiene la carga de 100 conexiones simult�neas sirviendo contenido est�tico:</p>

                <div class="example"><pre>[sctemme@GayDeceiver sctemme]$ vmstat 5 3
   procs                      memory     swap    io      system       cpu
 r b w     swpd   free   buff cache si so     bi bo   in     cs us sy  id
 1 0 1        0 162580   6848 40056    0    0 11  5 150     324  1  1  98
 6 0 1        0 163280   6856 40248    0    0  0 66 6384 1117   42 25  32
11 0 0        0 162780   6864 40436    0    0  0 61 6309 1165   33 28  40</pre></div>

                <p>La primera l�nea da la media desde el �ltimo reinicio. Las siguientes l�neas dan informaci�n a intervalos de cinco segundos. El segundo par�metro le dice a vmstat que genere tres reportes y luego se cierre.</p>
            

            <h4><a name="se-toolkit" id="se-toolkit">SE Toolkit</a></h4>
                

                <p>El SE Toolkit es un kit de herramientas de monitorizaci�n para Solaris. Su lenguaje de programaci�n est� basado en el preprocesador de C y viene con un gran n�mero de scripts de ejemplo. Se puede usar tanto en la l�nea de comandos como el GUI (Interfaz Gr�fico de Usuario) para mostrar informaci�n. Tambi�n puede programarse para aplicar reglas a los datos del sistema.</p>

                <p>El SE Toolkit ha dado unas cuantas vueltas durante un tiempo y ha cambiado de due�o varias veces desde que se cre�. Parece que ha encontrado su hogar finalmente en Sunnfreeware.com, donde puede ser descargado sin coste alguno. Hay un solo paquete para Solaris 8, 9 y 10 en SPARC y x86, e incluye el c�digo fuente. El autor del SE Toolkit, Richard Pettit ha comenzado una nueva compa��a, Captive Metrics4 que planea traer al mercado una herramienta de monitorizaci�n multiplataforma dise�ada en los mismos principios que el SE Toolkit, escrito en Java.</p>
            

            <h4><a name="dtrace" id="dtrace">DTrace</a></h4>
                

                <p>Teniendo en cuenta que DTrace est� disponible para Solaris, FreeBSD, y OS X, puede ser interesante explorarlo. Tambi�n est� disponible mod_dtrace para httpd.</p>
            

            <h4><a name="mod_status" id="mod_status">mod_status</a></h4>
                

                <p>El m�dulo mod_status da una vista general del rendimiento del servidor en un momento dado. Genera una p�gina HTML con, entre otros, el n�mero de procesos Apache que est� funcionando y cuantos bytes ha servido cada uno, y la carga de CPU utilizada por httpd y el resto del sistema. La Apache Software
                Foundation usa <code class="module"><a href="../mod/mod_status.html">mod_status</a></code> en su <a href="http://apache.org/server-status">web site</a>. Si configura la directiva <code>ExtendedStatus On</code> en su <code>httpd.conf</code>, la p�gina <code class="module"><a href="../mod/mod_status.html">mod_status</a></code> le dar� m�s informaci�n a costa de un poco m�s de carga por cada petici�n. Hay una nueva p�gina de status en la p�gina de Apache, basada en lua que pronto se incorporar� al c�digo fuente de Apache, puede encontrar el c�digo en <a href="https://github.com/Humbedooh/server-status">Humbedoo's server-status page at github</a>.</p>
            
        

        <h3><a name="web-server-log-files" id="web-server-log-files">Ficheros de Log del Servidor Web</a></h3>
            

            <p>Monitorizar y analizar los ficheros de log es una de las formas m�s efectivas de estar al tanto de la salud del servidor y su rendimiento. Monitorizar el log de errores ayuda a detectar condiciones de error, descubrir ataques y encontrar problemas de rendimiento. Analizar los logs de acceso le indica cu�n ocupado est� su servidor, qu� recursos son los m�s populares y de d�nde vienen los usuarios. Los datos de ficheros de log hist�ricos puede darle una visi�n inmejorable sobre las tendencias de acceso a su servidor, que le permite predecir cuando sus necesidades de rendimiento sobrepasar�n las de la capacidad de su servidor.</p>

            <h4><a name="ErrorLog" id="ErrorLog">Log de Errores</a></h4>
                

                <p>El log de errores contendr� mensajes si el servidor ha alcanzado el n�mero m�ximo de procesos activos o el n�mero m�ximo de ficheros abiertos simultaneamente. El log de errores tambi�n refleja cuando los procesos se est�n generando a un ritmo mayor del usual en respuesta a bajadas repentinas de carga. Cuando el servidor arranca, se redirige el descriptor de salida estandar de errores (stderr) hacia el log de errores, as� que cualquier error que httpd se encuentre despu�s de abrir sus ficheros de log aparecer�n en este log. Esto hace que sea buena pr�ctica revisar el log de errores frecuentemente.</p>

                <p>Antes de que httpd abra sus ficheros de log, cualquier error se volcar� en la salida est�ndar de errores stderr. Si inicia httpd manualmente, esta informaci�n de errores le aparecer� en la terminal y usted la podr� usar directamente para realizar la soluci�n de problemas en su servidor. Si su httpd se arranca con un script de inicio, el destino de los mensajes de error iniciales depender� del dise�o de �ste. El fichero <code>/var/log/messages</code> es generalmente un buen sitio donde empezar a mirar. En Windows, los primeros mensajes de error se escriben en el Log de Eventos de Aplicaciones, al que se puede acceder a trav�s del Visor de Eventos en las Herramientas Administrativas.</p>

                <p>El Log de errores se configura con las directivas <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog</a></code> y <code class="directive"><a href="../mod/core.html#loglevel">LogLevel</a></code>. El log de errores de la configuraci�n principal de httpd recibe los mensajes de log relacionados con las funcionalidades principales del servidor: arranque, parada, fallos, generaci�n excesiva de procesos, etc. La directiva <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog</a></code> puede usarse tambi�n en contenedores de host virtual. El log de errores de un host virtual recibe solo mensajes espec�ficos de ese virtualhost, tales como errores de autenticaci�n y errores de ficheros no encontrado.</p>

                <p>En un servidor que est� visible desde Internet, espere recibir multiples sondeos de vulnerabilidad y ataques de gusano en el log de errores. Muchos de estos son el objetivo de otro tipo de plataformas de servidor en lugar de Apache, pero con el estado actual de las cosas, los scripts de ataque sencillamente mandan todo lo que tienen contra cualquier puerto abierto, independientemente del servidor que se est� ejecutando o las aplicaciones que pueda haber instaladas en el servidor. Puede bloquear estos intentos usando un cortafuegos o con <a href="http://www.modsecurity.org/">mod_security</a>, pero �sto se sale del �mbito de este manual.</p>

                <p>La directiva <code class="directive"><a href="../mod/core.html#loglevel">LogLevel</a></code> determina qu� nivel de detalle se incluye en los logs. Hay ocho niveles de log como se describe aqu�:
                </p>
                <table>
                    <tr>
                        <td>
                            <p><strong>Nivel</strong></p>
                        </td>
                        <td>
                            <p><strong>Descripci�n</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>emerg</p>
                        </td>
                        <td>
                            <p>Emergencias - el sistema es inestable.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>alert</p>
                        </td>
                        <td>
                            <p>Se deben tomar medidas inmediatamente..</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>crit</p>
                        </td>
                        <td>
                            <p>Condiciones Cr�ticas.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>error</p>
                        </td>
                        <td>
                            <p>Condiciones de Error.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>warn</p>
                        </td>
                        <td>
                            <p>Condiciones de Aviso.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>notice</p>
                        </td>
                        <td>
                            <p>Normal pero condici�n significativa.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>info</p>
                        </td>
                        <td>
                            <p>Informacional.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>debug</p>
                        </td>
                        <td>
                            <p>Mensajes de nivel Debug (depuraci�n)</p>
                        </td>
                    </tr>
                </table>

                <p>El nivel de log por defecto es warn. Un servidor de producci�n no deber�a ser ejecutado en nivel debug, pero incrementar el nivel de detalle puede ser �til en el log de errores para hacer an�lisis de fallos. Empezando con la versi�n 2.3.8 puede especificarse <code class="directive"><a href="../mod/core.html#loglevel">LogLevel</a></code> por m�dulo:</p>

                <pre class="prettyprint lang-config">LogLevel debug mod_ssl:warn</pre>


                <p>Esto pone a todo el servidor en modo debug, excepto para <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code>, que suele ser muy ruidoso en ese nivel.</p>

            

            <h4><a name="AccessLog" id="AccessLog">Log de Acceso</a></h4>
                

                <p>Apache httpd mantiene un registro de cada petici�n que sirve en su fichero de log de acceso. Adem�s de la hora y la naturaleza de la petici�n, httpd puede registrar la direcci�n ip del cliente, la fecha y la hora de la petici�n, el resultado y el host u otra informaci�n. Los distintos formatos de log est�n documentados en el manual. Este fichero existe por defecto en el servidor principal y puede configurarse por cada virtualhost usando las directivas de configuraci�n <code class="directive"><a href="../mod/mod_log_config.html#transferlog">TransferLog</a></code> o <code class="directive"><a href="../mod/mod_log_config.html#customlog">CustomLog</a></code>.</p>

                <p>Los logs de acceso se pueden analizar con muchos programas de licencia libre o comerciales. Paquetes conocidos de licencia libre incluyen "Analog" o "Webalizer". El an�lisis de log deber�a hacerse offline para que el servidor de log no sea sobrecargado con el procesamiento de esos ficheros de log. La mayor parte de software de analisis de log reconocen el formato "Common". Los campos en las l�neas de log se explican en las siguientes entradas:</p>


                <div class="example"><pre>195.54.228.42 - - [24/Mar/2007:23:05:11 -0400] "GET /sander/feed/ HTTP/1.1" 200 9747
64.34.165.214 - - [24/Mar/2007:23:10:11 -0400] "GET /sander/feed/atom HTTP/1.1" 200 9068
60.28.164.72 - - [24/Mar/2007:23:11:41 -0400] "GET / HTTP/1.0" 200 618
85.140.155.56 - - [24/Mar/2007:23:14:12 -0400] "GET /sander/2006/09/27/44/ HTTP/1.1" 200 14172
85.140.155.56 - - [24/Mar/2007:23:14:15 -0400] "GET /sander/2006/09/21/gore-tax-pollution/ HTTP/1.1" 200 15147
74.6.72.187 - - [24/Mar/2007:23:18:11 -0400] "GET /sander/2006/09/27/44/ HTTP/1.0" 200 14172
74.6.72.229 - - [24/Mar/2007:23:24:22 -0400] "GET /sander/2006/11/21/os-java/ HTTP/1.0" 200 13457</pre></div>

                <table>
                    <tr>
                        <td>
                            <p><strong>Campo</strong></p>
                        </td>
                        <td>
                            <p><strong>Contenido</strong></p>
                        </td>
                        <td>
                            <p><strong>Explicaci�n</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>IP de Cliente</p>
                        </td>
                        <td>
                            <p>195.54.228.42</p>
                        </td>
                        <td>
                            <p>Direcci�n IP desde la que se env�a la petici�n.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Identidad RFC 1413</p>
                        </td>
                        <td>
                            <p>-</p>
                        </td>
                        <td>
                          <p>La identidad del Usuario Remoto tal y como la reporta su servicio identd</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>nombre de usuario</p>
                        </td>
                        <td>
                            <p>-</p>
                        </td>
                        <td>
                            <p>Nombre de usuario remoto autenticado por Apache</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Marca de tiempo</p>
                        </td>
                        <td>
                            <p>[24/Mar/2007:23:05:11 -0400]</p>
                        </td>
                        <td>
                            <p>Fecha y hora de la petici�n</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Petici�n</p>
                        </td>
                        <td>
                            <p>"GET /sander/feed/ HTTP/1.1"</p>
                        </td>
                        <td>
                            <p>La petici�n en si</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>C�digo de estado</p>
                        </td>
                        <td>
                            <p>200</p>
                        </td>
                        <td>
                            <p>C�digo de respuesta HTTP</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Contenido en Bytes</p>
                        </td>
                        <td>
                            <p>9747</p>
                        </td>
                        <td>
                            <p>Bytes transferidos sin contar las cabeceras HTTP</p>
                        </td>
                    </tr>
                </table>
            

            <h4><a name="rotating-log-files" id="rotating-log-files">Rotando ficheros de Log</a></h4>
                

                <p>Hay muchas razones para rotar ficheros de log. Incluso aunque pr�cticamente ya ning�n sistema operativo tiene un l�mite de tama�o de fichero de dos Gigabytes, los ficheros de log simplemente se hacen demasiado grandes con el tiempo. Adem�s, no deber�a hacerse cualquier an�lisis peri�dico de log en ficheros que el servidor est� escribiendo. La rotaci�n peri�dica de logs hace que el trabajo de an�lisis sea m�s manejable, y permite que usted pueda mantenerse al tanto de una manera m�s clara de las tendencias de uso del servidor.</p>

                <p>En sistemas unix, puede rotar ficheros de log sencillamente d�ndole al fichero antiguo un nombre nuevo con el comando mv. El servidor seguir� escribiendo en el fichero antiguo aunque tenga un nombre nuevo. Cuando env�e una se�al de reinicio en caliente (graceful restart) al servidor, �ste abrir� un nuevo fichero con el nombre configurado. Por ejemplo, podr�a ejecutar un script desde cron como este:</p>

                <div class="example"><p><code>
                    APACHE=/usr/local/apache2<br />
                    HTTPD=$APACHE/bin/httpd<br />
                    mv $APACHE/logs/access_log
                    $APACHE/logarchive/access_log-`date +%F`<br />
                    $HTTPD -k graceful
                </code></p></div>

                <p>Este m�todo tambi�n funciona en Windows, solo que no te manera tan sencilla. Mientras que el proceso de httpd en su servidor Windows seguir� escribiendo sobre el fichero de log despu�s de que se haya renombrado, el Servicio de Windows que ejecuta Apache no puede realizar un reinicio en caliente. Reiniciar un servicio en Windows significa pararlo y arrancarlo de nuevo. La ventaja de un reinicio en caliente es que los procesos hijo siguen respondiendo a las �ltimas peticiones antes de cerrarse. Mientras tanto, el servidor httpd sigue estando disponible para atender nuevas peticiones. La parada-arranque que el Servicio Windows tiene que realizar interrumpir� cualquier solicitud en progreso, y el servidor no estar� disponible hasta que se haya arrancado de nuevo. Tenga en cuenta esto cuando planee las horas de sus reinicios.
                </p>

                <p>Un segundo m�todo es usar "pipe" de logs. Desde las directivas
                  <code class="directive"><a href="../mod/mod_log_config.html#customlog">CustomLog</a></code>,
                    <code class="directive"><a href="../mod/mod_log_config.html#transferlog">TransferLog</a></code>
                    o <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog
                    </a></code> puede enviar datos de log hacia otro programa usando el caracter "pipe" (<code>|</code>). Por ejemplo:
                </p>

                <div class="example"><p><code>
CustomLog "|/usr/local/apache2/bin/rotatelogs /var/log/access_log 86400" common
                </code></p></div>

                <p>El programa destino del "pipe" recibir� los datos de log de Apache en su entrada est�ndar, y puede hacer con estos datos lo que quiera. El programa rotatelogs que viene con Apache rota de manera transparente los ficheros de log basados en un lapso de tiempo o cantidad de datos generados, y deja el fichero antiguo con un sufijo de marca de tiempo en su nombre de fichero. Este m�todo de rotar ficheros funciona bien en plataformas unix, pero no funciona actualmente en Windows.</p>
            

            <h4><a name="logging-and-performance" id="logging-and-performance">Registros de Log y Rendimiento</a></h4>
                

                <p>Escribir entradas a los ficheros de log de Apache evidentemente conlleva cierta carga, pero la informaci�n recolectada por los logs es tan valiosa que bajo circunstancias normales, el registro de logs no debe desactivarse. Para un rendimiento �ptimo, deber�a poner su contenido est�tico en un disco diferente que en el de los log de ficheros: los patrones de acceso son muy diferentes. Recolectar contenido del disco es una operaci�n de lectura en un patr�n relativamente aleatorio, y los ficheros de log se escriben de manera secuencial.</p>

                <p>No ponga un servidor de producci�n a funcionar con su <code class="directive"><a href="../mod/core.html#loglevel">LogLevel</a></code> configurado con debug. Este nivel de log provoca que una gran cantidad de informaci�n se escriba en el log de errores, incluyendo en el caso de acceso SSL, volcados completos de operaciones de lectura. Las implicaciones en rendimiento son significativas: use el valor por defecto "warn" en su lugar.</p>

                <p>Si su servidor tiene m�s de un host virtual, puede darle a cada uno un fichero de log distinto. Esto hace m�s facil analizar el fichero de log m�s adelante. Aunque, si su servidor tiene muchos host virtuales, todos los ficheros abiertos a�aden m�s carga en su sistema, y podr�a ser preferible tener log con un solo fichero. Use el caracter de formato <code>%v</code> al comienzo de su <code class="directive"><a href="../mod/mod_log_config.html#logformat">LogFormat</a></code>y desde la versi�n 2.3.8 en su <code class="directive"><a href="../mod/core.html#errorlog">ErrorLog</a></code> para hacer que httpd imprima el nombre del host virtual que recibe la  solicitud o el error al principio de cada l�nea de log. Un script sencillo en Perl puede separar el fichero despu�s de rotar: uno se incluye con el c�digo fuente de Apache bajo la ruta <code>support/split-logfile</code>.</p>

                <p>Puede usar la directiva <code class="directive"><a href="../mod/mod_log_config.html#bufferedlogs">BufferedLogs</a></code> para que Apache recolecte muchas lineas de log en memoria antes de escribirlas a disco. Esto puede redundar en una mejora del rendimiento, pero puede afectar al orden en el que los ficheros de log se escriben en el servidor.</p>
            
        

        <h3><a name="generating-a-test-load" id="generating-a-test-load">Generando una Carga de Prueba</a></h3>
            
            
            <p>Es �til generar una carga de prueba para comprobar el rendimiento del sistema en situaciones de operaci�n realistas. Adem�s de paquetes de software comercial como <a href="http://learnloadrunner.com/">LoadRunner</a>, hay un gran n�mero de herramientas libres para generar carga contra su servidor.</p>

            <ul>
                <li>Apache tiene un programa de pruebas llamado ab, siglas de Apache Bench. Puede generar carga para un servidor web solicitando una sucesi�n r�pida de peticiones del mismo fichero. Puedes especificar el n�mero de conexiones concurrentes y hacer que el programa se ejecute durante un tiempo determinado o un n�mero especificado de peticiones.
                </li>

                <li>Otro generador de carga disponible sin coste es http load11. Este programa funciona con un fichero URL y puede ser compilado con soporte SSL.
                </li>

                <li>La Apache Software Foundation ofrece una herramienta que se llama flood12. Floo12 es un programa bastante sofisticado que se configura con un fichero XML.
                </li>

                <li>Por �ltimo, JMeter13 , un subproyecto de Jakarta, es una herramienta de carga hecha al completo en Java. Aunque las primeras versiones de esta aplicaci�n eran lentas y dif�ciles de usar, la versi�n actual parece ser �til y vers�til.
                </li>

                <li>
                    <p>Proyectos externos a la ASF que han demostrado ser muy buenos: grinder, httperf, tsung, <a href="http://funkload.nuxeo.org/">FunkLoad</a></p>
                </li>
            </ul>
            
            <p>Cuando haga pruebas de carga en su servidor web, por favor tenga en cuenta que si el servidor est� en producci�n, la prueba puede afectar negativamente a los tiempos de respuesta del servidor.</p>
        
    </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="configuring-for-performance" id="configuring-for-performance">Configurar para obtener Rendimiento</a></h2>
        


        <h3><a name="apache-configuration" id="apache-configuration">Configuraci�n de httpd</a></h3>
            

            <p>Apache httpd 2.2 es por defecto un servidor que hace pre-fork. Cuando el servidor arranca, el proceso padre arranca un n�mero determinado de procesos hijos que hacen el trabajo actual de servir a las peticiones recibidas. Pero Apache httpd 2.0 introdujo el concepto de M�dulo de Multi-Proceso (MPM). Los desarrolladores pueden desarrollar MPMs para que se ajuste al proceso- o una arquitectura multihilo para su sistema operativo espec�fico. Apache 2 viene con MPMs especiales para Windows, OS/2, Netware y BeOS. En plataformas tipo-unix. los MPMs m�s populares son Prefork y Worker. El MPM Prefork ofrece el mismo modelo de pre-fork que usa Apache 1.3. El MPM Worker ejecuta un n�mero de procesos hijo, y genera threads que gestionan un gran n�mero de peticiones dentro de cada proceso hijo. En 2.4 los MPMs ya no tienen que estar vinculados al binario de httpd. Pueden cargarse intercambiare como cualquier otro m�dulo a trav�s de <code class="directive"><a href="../mod/mod_so.html#loadmodule">LoadModule</a></code>. El MPM por defecto en 2.4 es event.</p>

            <p>El n�mero m�ximo de workers, sean procesos hijo en pre-fork, o hilos dentro de un proceso, es un indicativo de cuantas peticiones puede contestar simultaneamente su servidor. Es una mera estimaci�n porque el kernel puede encolar intentos de conexi�n a su servidor web. Cuando su sitio web est� muy ocupado y el n�mero m�ximo de workers est� activo, la m�quina no alcanza un l�mite en el que los clientes dejar�n de tener acceso. Sin embargo, una vez que las peticiones comienzan a acumularse, el rendimiento del sistema seguramente se ver� degradado.</p>

            <p>Finalmente, si el servidor httpd en cuesti�n no est� ejecutando c�digo de terceros, a trav�s de <code>mod_php</code>, <code>mod_perl</code> o similar, recomendamos el uso de <code class="module">mpm_event</code>. Este MPM es ideal para situaciones tipo proxy o cache, donde los servidores httpd trabajan como una fina capa entre los clientes y los servidores backend realizando el trabajo de verdad.</p>

            <h4><a name="MaxRequestWorkers" id="MaxRequestWorkers">MaxRequestWorkers</a></h4>
                

                <p>La directiva <code>MaxRequestWorkers</code> en el fichero de configuraci�n de Apache httpd especifica el n�mero m�ximo de workers que su servidor puede generar. Tiene dos directivas relacionadas, <code>MinSpareServers</code> � <code>MinSpareThreads</code> en MPM's multihilo y <code>MaxSpareServers</code> � <code>MaxSpareThreads</code> en MPM's multihilo, que especifican el n�mero de Workers que Apache mantiene esperando a recibir peticiones. El n�mero m�ximo absoluto de procesos se configura mediante la directiva <code>ServerLimit</code></p>
            

            <h4><a name="spinning-threads" id="spinning-threads">Rotaci�n de hilos</a></h4>
                

                <p>Para el MPM prefork las directivas de m�s arriba son todo lo necesario para determinar el l�mite de procesos. Sin embargo, si est� usando un MPM multihilo la situaci�n es un poco m�s complicada. Los MPMs Multihilo soportan la directiva  <code>ThreadsPerChild</code>. Apache requiere que <code>MaxRequestWorkers</code> sea divisible entre <code>ThreadsPerChild</code>. Si configura cualquiera de las dos directivas a un n�mero que no cumple este requisito, Apache enviar� un mensaje de aviso al log de errores para ajustar el valor de <code>ThreadsPerChild</code> hasta que su valor sea divisible con <code>MaxRequestWorkers</code>.</p>
            

            <h4><a name="sizing-MaxRequestWorkers" id="sizing-MaxRequestWorkers">Dimensionando MaxRequestWorkers</a></h4>
                

                <p>De manera �ptima, el n�mero m�ximo de procesos deber�a configurarse para que se use toda la memoria del sistema, pero no m�s. Si su sistema se sobrecarga necesitar� paginar memoria a disco, y el rendimiento se degradar� r�pidamente. La f�rmula para determinar <code class="directive"><a href="../mod/mpm_common.html#maxrequestworkers">MaxRequestWorkers</a></code> es muy sencilla:
                </p>

                <div class="example"><p><code>
                    RAM total - RAM para el SO - RAM para programas externos<br />
                    MaxRequestWorkers =
                    -------------------------------------------------------<br />
                    RAM para procesos httpd
                </code></p></div>

                <p>Las distinta cantidad de memoria dedicada al SO, programas externos y procesos httpd se determinan de la mejor manera mediante observaci�n: use los comandos top y free descritos m�s arriba para determinar el uso de memoria de SO sin el servidor http funcionando. Tambi�n puede determinar el uso del t�pico proceso de servidor web con top: la mayor�a de implementaciones de top tienen una columna de Tama�o Residente (RSS) y una columna de memoria compartida.</p>

                <p>La diferencia entre estas dos es la cantidad de memoria por proceso. El segmento compartido realmente solo existe una vez y es usado por el c�digo y librer�as cargadas y el recuento din�mico de inter-proceso, o 'scoreboard', que Apache mantiene. Cuanta memoria usa cada proceso para s� mismo depende en gran manera del n�mero y el tipo de modulos que usted use. El mejor m�todo a usar para determinar esta necesidad es generar la t�pica prueba de carga contra su servidor web y ver hasta qu� tama�o llegan sus procesos httpd.
                </p>

                <p>El par�metro de RAM para programas externos est� dirigido a programas CGI y scripts que se ejecutan fuera de los procesos del servidor web. Aun as�, si tiene una m�quina virtual de Java ejecutando Tomcat en la misma m�quina, tambi�n necesitar� una cantidad significatiba de memoria. La estimaci�n indicada m�s arriba le deber�a dar una idea de hasta d�nde puede subir el valor de <code>MaxRequestWorkers</code>, pero no es una ciencia exacta.Cuando tenga dudas, sea conservador y use un valor bajo <code>MaxRequestWorkers</code>. El kernel Linux le dar� a la memoria extra un buen uso para cahear accesos a disco. En Solaris necesita suficiente memoria disponible de memoria RAM real para crear cualquier proceso. Si no hay memoria real disponible, httpd comenzar� a escribir mensajes 'No space left on device' (no queda espacio en el dispositivo) en el log de errores y no podr� generar nuevos procesos, as� que un valor m�s alto de <code>MaxRequestWorkers</code> puede ser una desventaja.</p>
            

            <h4><a name="selecting-your-mpm" id="selecting-your-mpm">Seleccionando su MPM</a></h4>
                

                <p>La raz�n principal para seleccionar un MPM multihilo es que los hilos consumen menos recursos que los procesos, y le supone mucho menos esfuerzo al sistema cambiar entre hilos. Esto es m�s cierto en unos sistemas operativos que en otros. En sistemas como Solaris y AIX, manipular procesos es relativamente caro en t�rminos de recursos del sistema. En estos sistemas, ejecutar un MPM multihilo tiene sentido. En Linux, la implementaci�n multihilo actualmente usa un proceso por cada hilo. Los procesos en Linux son relativamente ligeros, pero eso significa que un MPM multihilo ofrece algo menos de ventaja de rendimiento que en otros sistemas.
                </p>

                <p>Desde cierta perspectiva, ejecutar un MPM multihilo podr�a provocar problemas de estabilidad en algunas situaciones. Por ejemplo, si un proceso hijo falla en un MPM prefork, como mucho una conexi�n de cliente se ver� afectada. Sin embargo, si un proceso con hilos falla, todos los hilos en ese proceso desaparecen, lo cual significa que todos los clientes a los que se estaba sirviendo por ese proceso ver�n que su conexi�n es abortada. Adem�s, est�n los problemas de "thread-safety" (seguras para multihilo), que ocurren especialmente con librer�as de terceros. En aplicaciones multihilo, los hilos pueden acceder la mismas variables indiscriminadamente, no conociendo si esa variable ha sido cambiada por otro hilo.</p>

                <p>Este ha sido un punto "doloroso" en la comunidad de PHP. El procesaador de PHP depende en gran medida de librer�as de terceros y no puede garantizar que que todas estas son thread-safe (seguras para uso multihilo). Las buenas noticias es que si ejecuta Apache en Linux, puede interpretar PHP con el MPM prefork sin miedo a perder demasiado rendimiento con respecto a la opci�n multihilo.</p>
            

            <h4><a name="spinning-locks" id="spinning-locks">Rotaci�n de bloqueos</a></h4>
                

                <p>Apache httpd mantiene un bloqueo inter-proceso alrededor de su listener de red. Para todos los prop�sitos pr�cticos, esto significa que solo un proceso httpd hijo puede recibir una petici�n en un momento dado. Los otros procesos o bien est�n ya sirviendo peticiones o est�n "acampando" en el bloqueo, esperando a que el listener de red est� disponible. Este proceso se visualiza mejor como una puerta giratoria, en el que solo se permite a un proceso en la puerta cada vez. En un servidor web muy cargado con peticiones llegando constantemente, la puerta gira r�pidamente y se aceptan peticiones a un ritmo constante. En un servidor web con poca carga, los procesos que "retienen" el bloqueo pueden mantenerse en la puerta durante un tiempo, mientras tanto el resto de procesos no hacen nada y se mantienen esperando a obtener el bloqueo. En este momento, el proceso padre puede decidir que se cierren algunos hijos basando la decisi�n en su directiva <code>MaxSpareServers</code>.</p>
            

            <h4><a name="the-thundering-herd" id="the-thundering-herd">The Thundering Herd (Manada estruendosa)</a></h4>
                

                <p>La funci�n del 'accept mutex' (como este bloqueo de inter-proceso se llama) es mantener la recepci�n de peticiones funcionando de manera ordenada. Si el bloqueo est� ausente, el servidor puede exhibir un s�ndrome de "Thundering Herd".</p>

                <p>Piense por un momento en un equipo de f�tbol americano colocado en la l�nea de ataque. Si los jugadores fueran procesos Apache todos los miembros del equipo ir�an a por la bola simult�neamente en el saque. Un proceso la coger�a y todos los dem�s tendr�an que apelotonarse detr�s en la l�nea de ataque para el saque. En esta met�fora, el accept mutex actua como el quarterback, entregando la "pelota" de conexi�n al proceso jugador adecuado.</p>

                <p>Mover esta cantidad de informaci�n de un lado a otro, es obviamente mucho trabajo, y, como una persona ingeligente, un servidor web inteligente intenta evitarlo cuando sea posible. Y por ello est� el sistema de puerta giratoria. �ltimamente, muchos sistemas operativos, incluido Linux y Solaris, han puesto c�digo en su lugar para evitar el s�ndrome de Thundering Herd. Apache reconoce esto y si usted trabaja con un solo listener de red, es decir, con un solo host virtual o solo el servidor principal, Apache evitar� usar un accept mutex. Si funciona con m�ltiples listeners (por ejemplo porque tiene un virtualhost atendiendo peticiones SSL), activar� el accept mutex para evitar conflictos internos.</p>

                <p>Puede manipular el accept mutex con la directiva <code>AcceptMutex</code> en 2.2.x, o <code>Mutex</code> en 2.4.x. Adem�s de poner el accept mutex a off, puede seleccionar el m�todo de bloqueo. M�todos t�picos de bloqueo incluyen fcntl, Sem�foros System V y bloqueos pthread. No todos est�n disponibles en todas las plataformas, y su disponibilidad depende de configuraciones en el momento de compilar. Los distintos mecanismos de bloqueo pueden poner cierta carga en los recursos del sistema: manip�lelos con cuidado.</p>

                <p>No hay raz�n de peso para deshabilitar el accept mutex. Apache autom�ticamente reconoce cuando hay una situaci�n de un solo listener como se describe m�s arriba y sabe si es seguro funcionar sin mutex en su plataforma.</p>
            
        
        
        <h3><a name="tuning-the-operating-system" id="tuning-the-operating-system">Afinando el Sistema Operativo</a></h3>
            

            <p>A menudo las personas buscan 'la clave m�gica' que har� que su sistema rinda cuatro veces m�s r�pido con tan solo cambiar una valor de configuraci�n. La verdad es, los derivados de Unix de hoy en d�a est�n ya bastante bien ajustados "de f�brica" y no hay mucho que hacer para conseguir que fucionen de manera �ptima. Sin embargo, hay algunas cosas que como administrador usted puede hacer para mejorar el rendimiendo.</p>

            <h4><a name="ram-and-swap-space" id="ram-and-swap-space">Memoria y Espacio Swap</a></h4>
                

                <p>El t�pico mantra respecto a la RAM es "m�s es mejor". Como se ha comentado con antelaci�n, a la RAM sin utilizar el sistema le acaba dando buen uso como cache del sistema de ficheros. Los procesos de Apache usan m�s memoria si carga m�s m�dulos, especialmente si usa m�dulos que generan p�ginas de contenido din�mico, como PHP o mod_perl. Un archivo de configuraci�n grande, con muchos host virtuales, tambi�n tiende a aumentar el uso de memoria del proceso. Tener RAM de sobra permite a Apache con m�s procesos hijo, que a su vez permiten a Apache servir m�s peticiones de manera concurrente.</p>

                <p>Mientras que varias plataformas tratan su memoria virtual de distinta manera, nunca es una buena idea trabajar con menos espacio swap basado en disco que RAM. La memoria virtual del sistema est� dise�ada para proveer un �ltimo recurso aparte de la RAM, pero cuando no tiene suficiente espacio en disco y se queda sin memoria swap, su m�quina se para por completo. Esto puede hacer que su equipo falle, requiriendo un reinicio de m�quina por el cual su hosting puede acabar cobr�ndole.</p>

                <p>Adem�s, con tal p�rdida de servicio naturalmente ocurre lo que usted menos quiere: cuando el mundo conoce su p�gina web y est� intentando entrar sin �xito. Si tiene suficiente espacio swap basado en disco disponible, y la m�quina se sobrecarga, puede acabar siendo muy lenta mientras el sistema carga memoria swap del disco y la escribe, pero cuando la carga baja, entonces el sistema deber�a recuperarse. Recuerde, todav�a tiene <code>MaxRequestWorkers</code> para limitar el uso de recursos.</p>

                <p>La mayor�a de los sistemas operativos tipo-unix usan particiones espec�ficas como espacio swap. Cuando el sistema arranca encuentra todas las particiones swap en los discos, por tipo de partici�n o porque est�n listadas en el fichero <code>/etc/fstab</code>, y autom�ticamente los activa. Cuando a�ade un disco al instalar el sistema operativo, aseg�rese de alojar suficiente memoria swap para actualizaciones futuras de RAM. Reasignar espacio en disco en un sistema operativo es un proceso engorroso.</p>

                <p>Planifique el espacio disponible para swap en el disco duro para al menos el doble de la cantidad de RAM, quiz�s hasta cuatro veces en situaciones cuando alcanza el tope de RAM con frecuencia. Recuerde ajustar esta configuraci�n cuando incremente la RAM en su sistema. En un apuro, puede usar un fichero normal como espacio swap. Para instrucciones sobre c�mo hacer esto, vea las p�ginas de manual los comandos <code>mkswap</code> y <code>swapon</code> o <code>swap</code>.</p>
            

            <h4><a name="ulimit-files-and-processes" id="ulimit-files-and-processes">ulimit: Ficheros y Procesos</a></h4>
                

                <p>Con una m�quina con suficiente memoria RAM y capacidad de procesador, puede hacer funcionar cientos de procesos de Apache si fuera necesario... y si el kernel lo permite.</p>

                <p>Imagine una situaci�n en la que cientos de servidores web est�n funcionando; si algunos de ellos necesitan lanzar procesos CGI, se podr�a alcanzar r�pidamente el m�ximo n�mero de procesos.</p>

                <p>Sin embargo, puede cambiar este l�mite con el comando</p>

                <div class="example"><p><code>
                    ulimit [-H|-S] -u [newvalue]
                </code></p></div>

                <p>Esto debe cambiarse antes de arrancar el servidor web, puesto que el nuevo valor solo estar� disponible en la shell actual y en programas que arranquen desde ella. En versiones nuevas del kernel de Linux el valor se ha subido a 2048. En FreeBSD, el valor parece que es bastante inusual, 513. En la shell del usuario por defecto del sistema, <code>csh</code> el equivalente es <code>limit</code> y funciona de manera an�loga a la de la shell tipo-Bourne <code>ulimit</code>:</p>

                <div class="example"><p><code>
                    limit [-h] maxproc [newvalue]
                </code></p></div>

                <p>De manera similar, el kernel puede limitar el n�mero de ficheros abiertos por proceso. Esto generalmente no es un problema en servidores pre-fork, que solo tratan una petici�n a la vez por procesos. Servidores multihilo, sin embargo, sirven muchas peticiones por proceso y es mucho m�s f�cil acabar sin descriptores de fichero. Puede aumentar el n�mero m�ximo de ficheros abiertos por proceso ejecutando el comando:</p>

                <div class="example"><p><code>ulimit -n [newvalue]</code></p></div>

                <p>Y reiteramos, esto debe realizarse antes de arrancar Apache.</p>
            

            <h4><a name="setting-user-limits-on-system-startup" id="setting-user-limits-on-system-startup">Configurando L�mites de Usuario en el Arranque del Sistema</a></h4>
                

                <p>En Linux, puede configurar los par�metros de ulimit en el arranque editando el fichero <code>/etc/security/limits.conf</code>. Este fichero le permite poner l�mites flexibles o estrictos por usuario o por grupo; el fichero contiene comentarios explicando estas opciones. Para activar esto, aseg�rese de que el fichero <code>/etc/pam.d/login</code> contiene la l�nea</p>

                <div class="example"><p><code>session required /lib/security/pam_limits.so</code></p></div>

                <p>Todos los elementos pueden tener un l�mite 'flexible' o 'estricto': el primero es el valor por defecto y el segundo el m�ximo valor para ese elemento.</p>

                <p>En <code>/etc/login.conf</code> de FreeBSD estos recursos pueden limitarse o extenderse globalmente a nivel de sistema, de forma an�loga a como se hace en <code>limits.conf</code>. L�mites 'flexibles' pueden ser especificados con <code>-cur</code> y l�mites 'estrictos' con <code>-max</code>.</p>

                <p>Solaris tiene un mecanismo similar para manipuilar los valores l�mites en el arranque: En <code>/etc/system</code> puede configurar valores para el sistema entero en el arranque. Estos son los mismos valores que se pueden modificar con del depurador de kernel <code>mdb</code> en tiempo real. El l�mite flexible y estricto correspondiente a ulimit -u puede configurarse con:</p>

                <div class="example"><p><code>
                    set rlim_fd_max=65536<br />
                    set rlim_fd_cur=2048
                </code></p></div>

                <p>Solaris calcula el n�mero m�ximo de procesos permitidos por usuario (<code>maxuprc</code>) bas�ndose en la memoria total disponible en el sistema (<code>maxusers</code>). Puede examinar los valores con</p>

                <div class="example"><p><code>sysdef -i | grep maximum</code></p></div>

                <p>pero no est� recomendado cambiarlos.</p>
            

            <h4><a name="turn-off-unused-services-and-modules" id="turn-off-unused-services-and-modules">Desactivar servicios y m�dulos que no se usan</a></h4>
                

                <p>Muchas distribuciones UNIX y Linux vienen con una serie de servicios activados por defecto. Probablemente necesite algunos de ellos. Por ejemplo, su servidor web no necesita tener sendmail funcionando, y probablemente tampoco necesite el servidor NFS, etc. Ap�guelos.</p>

                <p>En Linux Red Hat, la herramienta chkconfig le ayudar� a hacer esto desde la l�nea de comandos. En sistemas Solaris <code>svcs</code> y <code>svcadm</code> le ense�ar� qu� servicios est�n activados y se desactivar�n respectivamente.</p>

                <p>De la misma manera, tenga un ojo cr�tico con los m�dulos de Apache que cargue. La mayor parte de distribuciones de binarios de Apache httpd, versiones pre-instaladas que vienen con distribuiciones Linux, tienen sus m�dulos cargados con la directiva <code class="directive">LoadModule</code>.</p>

                <p>M�dulos sin utilizar pueden quitarse: si no depende ni de su funcionalidad ni de sus directivas de configuraci�n, puede desactivarlos poniendo un comentario (poner el car�cter '#'' delante) en la l�neas correspondientes de <code class="directive">LoadModule</code>. Vea la documentaci�n de cada m�dulo antes de decidir si lo mantiane cargado. Aunque la carga de un m�dulo que no se usa es peque�a, tambi�n es innecesaria.</p>
            
        
    </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="caching-content" id="caching-content">Cacheando Contenido</a></h2>
        

        <p>Peticiones para contenido que se genera din�micamente generalmente consumen m�s recursos que el contenido est�tico. El contenido est�tico consiste en ficheros sencillos como p�ginas, im�genes, etc. que se encuentran en el disco y se sirven de manera muy eficiente. Muchos sistemas operativos cachean autom�ticamente en memoria los contenidos de ficheros a los que se accede frecuentemente.</p>

        <p>Procesar solicitudes din�micas, por el contrario, requieren mucho m�s esfuerzo. Ejecutando scripts CGI, pasando solicitudes a un servidor externo de aplicaciones y acceder a contenido en base de datos puede a�adir retardo y carga de proceso a un servidor web ocupado. Bajo muchas circunstancias, el rendimiento se puede mejorar peticiones m�s realizadas de contenido din�mico convirti�ndolas en contenido est�tico. En esta secci�n se ver�n dos formas de gestionarlo.</p>


        <h3><a name="making-popular-pages-static" id="making-popular-pages-static">Convertir las P�ginas M�s Visitadas en Est�ticas.</a></h3>
            

            <p>Pre-renderizando las p�ginas que son m�s visitadas para las solicitudes m�s realizadas en su aplicaci�n, puede darle una mejora significativa de rendimiento sin dejar de lado la flexibilidad del contenido generado din�micamente. Por ejemplo, si su aplicaci�n es un servicio de entrega de flores, probablemente quiera pre-renderizar sus p�gina de cat�logo para las rosas rojas en las semanas previas al d�a de los enamorados. Cuando el usuario busca rosas rojas, se sirven de p�ginas pre-renderizadas. Solicitudes para, por ejemplo, rosas amarillas se generar�n directamente desde la base de datos. El m�dulo mod_rewrite incluido con Apache es una gran herramienta para implementar estas sustituciones.</p>


            <h4><a name="example-a-statically-rendered-blog" id="example-a-statically-rendered-blog">Ejemplo: Un plog Renderizado Est�ticamente</a></h4>
                
                    

                <p>Blosxom es un paquete ligero de log de web que se ejecuta como CGI. Est� escrito en Perl y usa texto plano para entradas de formulario. Adem�s de ejecutarse como CGI, Blosxom puede ejecutar desde l�nea de comando p�ginas pre-renderizadas de blog. Pre-renderizando p�ginas a HTML est�tico pude resultar en mejoras de rendimiento significativas en el caso de que un gran n�mero de personas empiece a leer el blog.</p>

                <p>Para ejecutar blosxom para generaci�n de p�ginas est�ticas, edite el script CGI de acuerdo con la documnetaci�n. Configure la variable de directorio $static para el <code class="directive">DocumentRoot</code> del servidor web, y ejecute el script de la l�nea de comandos como sigue:</p>

                <div class="example"><p><code>$ perl blosxom.cgi -password='whateveryourpassword'</code></p></div>

                <p>Esto puede ejecutarse de manera peri�dica desde Cron, despu�s de que suba contenido, etc. Para hacer que Apache sustituya las p�ginas renderizadas est�ticamente por contenido din�mico, usaremos mod_rewrite. Este m�dulo se incluye en el &#263;odigo fuente de Apache, pero no se compila por defecto. Puede compilarse con el servidor pasando la opci�n <code>--enable-rewrite[=shared]</code> al comando configure. Muchas distribuciones de binarios de Apache vienen con <code class="module"><a href="../mod/mod_rewrite.html">mod_rewrite </a></code> incluido. A continuaci�n hay un ejemplo de host virtual de Apache que se beneficia de p�ginas de blog renderizadas:</p>

<pre class="prettyprint lang-config">Listen *:8001
  &lt;VirtualHost *:8001&gt;
      ServerName blog.sandla.org:8001
      ServerAdmin sander@temme.net
      DocumentRoot "/home/sctemme/inst/blog/httpd/htdocs"
      &lt;Directory "/home/sctemme/inst/blog/httpd/htdocs"&gt;
          Options +Indexes
          Require all granted
          RewriteEngine on
          RewriteCond "%{REQUEST_FILENAME}" "!-f"
          RewriteCond "%{REQUEST_FILENAME}" "!-d"
          RewriteRule "^(.*)$"              "/cgi-bin/blosxom.cgi/$1" [L,QSA]
      &lt;/Directory&gt;
      RewriteLog "/home/sctemme/inst/blog/httpd/logs/rewrite_log"
      RewriteLogLevel 9
      ErrorLog "/home/sctemme/inst/blog/httpd/logs/error_log"
      LogLevel debug
      CustomLog "/home/sctemme/inst/blog/httpd/logs/access_log" common
      ScriptAlias "/cgi-bin/" "/home/sctemme/inst/blog/bin/"
      &lt;Directory "/home/sctemme/inst/blog/bin"&gt;
          Options +ExecCGI
          Require all granted
      &lt;/Directory&gt;
  &lt;/VirtualHost&gt;</pre>


                <p>Las directivas <code class="directive">RewriteCond</code> y <code class="directive">RewriteRule</code> dicen que, si el recurso requerido no existe como fichero o directorio, su path se le pasar� al CGI Blosxom para su renderizado. Blosxom usa Path Info (Informaci�n de Ruta) para especificar entradas de blog y p�ginas de �ndice, y esto quiere decir que si una ruta en concreto existe como fichero est�tico en el sistema de ficheros, el fichero se sirve directamente. Cualquier petici�n que no est� pre-renderizada se sirve por el CGI. Esto significa que las entradas individuales, que muestran los comentarios, se sirven siempre por el CGI que entonces indica que su spam de comentarios siempre est� visible. Esta configuraci�n oculta el CGI Blosxom de la URL visible por el usuario en su barra de direcciones del navegador. Mod_rewrite es un m�dulo muy potente y versatil, invest�guelo para llegar a una configuraci�n que sea la m�s adecuada para su situaci�n.</p>
            
        

        <h3><a name="caching-content-with-mod_cache" id="caching-content-with-mod_cache">Cacheando Contenido con mod_cache</a></h3>
            

            <p>El m�dulo mod_cache facilita cacheo inteligente de respuestas HTTP: est� al tanto de los tiempos de expiraci�n y requerimientos de contenido que son parte de la especificaci�n HTTP. El m�dulo mod_cache cachea contenido de respuestas de URL. Si el contenido que se env�a al cliente es considerado como cacheable, se guarda en disco. Peticiones posteriores a la misma URL se sirven del disco directamente desde la cache. El modulo que provee cache para mod_cache, mod_disk_cache, determina el contenido que se almacena en disco. Para la mayor�a de sistemas de servidores tendr�n m�s disco disponible que memoria, y es buno anotar que algunos kernel de sistema operativo frecuentemente cachean el acceso a disco de manera transparente en memoria, as� que replicar esto en el servidor no es �til.</p>

            <p>Para activar un cacheo eficiente y evitar presentar al usuario contenido obsoleto o inv�lido, la aplicaci�n que general el contenido real debe enviar las cabeceras de respuesta correctas. Sin cabeceras como <code>Etag:</code>, <code>Last-Modified:</code> o <code>Expires:</code>,  <code class="module"><a href="../mod/mod_cache.html">mod_cache</a></code> no puede tomar la decisi�n adecuada sobre qu� contenido debe cachear, servir desde la cache o no tocar. Cuando est� probando el cacheo, podr� encontrarse con que tiene que modificar su aplicaci�n, o si esto es imposible, hacer una selecci�n de URLs que causan problemas con el cacheo. Los m�dulos de mod_cache no se compilan por defecto, pero puede activarlos pasando la opci�n <code>--enable-cache[=shared]</code> al script configure. Si usa una distribuci�n de binarios de Apache httpd, o Apache ven�a con un port o colecci�n de paquetes, puede que ya venga <code class="module"><a href="../mod/mod_cache.html">mod_cache</a></code> incluido.</p>


            <h4><a name="example-wiki" id="example-wiki">Ejemplo: wiki.apache.org</a></h4>
                
                    
                <p>El Wiki de la Apache Software Foundation se sirve con MoinMoin. MoinMoin est� escrito en Python y se ejecuta como CGI. Hasta la fecha, cualquier intento de ejecutarlo con mod_python no ha tenido �xito. El CGI ha demostrado poner una carga insoportable en la m�quina servidor, especialmente cuando el wiki estaba siendo indexado por motores de b�squeda como Google. Para aligerar la carga en la m�quina servidor, el equipo de Infraestructuras de Apache activ� mod_cache. Result� que MoinMoin necesitaba un peque�o parche para asegurar un comportamiento adecuado detr�s del servidor de cacheo: algunas peticiones no pueden cachearse nunca y los m�dulos correspondientes de Python fueron parcheados para enviar las cabeceras de respuesta HTTP adecuadas. Despu�s de esta modificaci�n, la cache delante del Wiki fue activada con el siguiente fragmento de configuraci�n en <code>httpd.conf</code>:</p>

<pre class="prettyprint lang-config">CacheRoot /raid1/cacheroot
CacheEnable disk /
# Una p�gina modificada hace 100 minutos expirar� en 10 minutos
CacheLastModifiedFactor .1
# Siempre comprobar de nuevo despu�s de 6 horas
CacheMaxExpire 21600</pre>


                <p>Esta configuraci�n intentar� cachear cualquiera y todo el contenido dentro del host virtual. Nunca cachear� contenido durante m�s de 6 horas (la directiva <code class="directive"><a href="../mod/mod_cache.html#cachemaxexpire">CacheMaxExpire</a></code>). Si no hay cabecera <code>Expires:</code> presente en la respuesta, <code class="module"><a href="../mod/mod_cache.html">mod_cache</a></code> calcular� un periodo de expiraci�n con la cabecera <code>Last-Modified:</code>. El c�lculo usando <code class="directive"><a href="../mod/mod_cache.html#cachelastmodifiedfactor">CacheLastModifiedFactor</a></code> est� basado en la asunci�n de que la p�gina se modific� recientemente, que probablemente cambie en un futuro cercano y que tendr� que ser re-cacheada.</p>

                <p>Tenga en cuenta que puede compensar <em>deshabilitar</em> la cabecera <code>ETag:</code>: Para ficheros m�s peque�os que 1k el servidor tiene que calcular el checksum (generalmente MD5) y despu�s enviar una respuesta <code>304 Not Modified</code>, que usar� algo de CPU y aun as� saturar los recursos de red para la transferencia (un paquete TCP). Para recursos mayores que 1k puede resultar caro en CPU calcular la cabecera de cada petici�n. Desafortunadamente no existe una manera de cachear estas cabeceras.</p>

<pre class="prettyprint lang-config">&lt;FilesMatch "\.(jpe?g|png|gif|js|css|x?html|xml)"&gt;
    FileETag None
&lt;/FilesMatch&gt;</pre>


                <p>Esto deshabilitar� la generaci�n de la cabecera <code>ETag:</code> para la mayor parte de recursos est�ticos. El servidor no calcula estas cabeceras para recursos din�micos.</p>
            
        
    </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="further-considerations" id="further-considerations">Otras Consideraciones</a></h2>
        

        <p>Armado con el conocimiento de c�mo afinar el sistema para entregar el rendimiento deseado, pronto descubrir� que <em>un</em> solo sistema puede provocar un cuello de botella. C�mo hacer que un sistema sea apto para crecimiento, o como afinar un n�mero de sistemas como uno solo ser� comentado en la p�gina<a href="http://wiki.apache.org/httpd/PerformanceScalingOut">PerformanceScalingOut</a>.
        </p>
    </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/misc/perf-scaling.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/misc/perf-scaling.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/misc/perf-scaling.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/misc/perf-scaling.html';
(function(w, d) {
    if (w.location.hostname.toLowerCase() == "httpd.apache.org") {
        d.write('<div id="comments_thread"><\/div>');
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://comments.apache.org/show_comments.lua?site=' + comments_shortname + '&page=' + comments_identifier;
        (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(s);
    }
    else {
        d.write('<div id="comments_thread">Comments are disabled for this page at the moment.<\/div>');
    }
})(window, document);
//--><!]]></script></div><div id="footer">
<p class="apache">Copyright 2018 The Apache Software Foundation.<br />Licencia bajo los t�rminos de la <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>.</p>
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/quickreference.html">Directivas</a> | <a href="http://wiki.apache.org/httpd/FAQ">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa del sitio web</a></p></div><script type="text/javascript"><!--//--><![CDATA[//><!--
if (typeof(prettyPrint) !== 'undefined') {
    prettyPrint();
}
//--><!]]></script>
</body></html>