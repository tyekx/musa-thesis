<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>Consejos de Seguridad - Servidor HTTP Apache Versi�n 2.5</title>
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
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.5</a> &gt; <a href="./">Documentaci�n diversa</a></div><div id="page-content"><div id="preamble"><h1>Consejos de Seguridad</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/misc/security_tips.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/misc/security_tips.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/misc/security_tips.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ko/misc/security_tips.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../tr/misc/security_tips.html" hreflang="tr" rel="alternate" title="T�rk�e">&nbsp;tr&nbsp;</a></p>
</div>

    <p>Le daremos algunas pistas y consejos sobre problemas de seguridad al configurar un servidor web. Algunas de las sugerencias ser�n gen�ricas, otras espec�ficas de Apache.</p>
  </div>
<div id="quickview"><ul id="toc"><li><img alt="" src="../images/down.gif" /> <a href="#uptodate">Mantenerse al D�a</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#dos">Ataques de Denegaci�n de Servicio (DoS, Denial of Service)</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#serverroot">Permisos en Directorios ServerRoot</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#ssi">Server Side Includes (Inclusiones en la parte Servidor)</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#cgi">CGI en General</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#nsaliasedcgi">CGI sin Alias de Script</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#saliasedcgi">CGI con Alias de Script</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#dynamic">Otras fuentes de contenido din�mico</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#dynamicsec">Seguridad de Contenido Din�mico</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#systemsettings">Configuraci�n de Protecci�n del Sistema</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#protectserverfiles">Proteger Ficheros del Servidor por Defecto</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#watchyourlogs">Examinando sus Logs</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#merging">Fusi�n de secciones de configuraci�n</a></li>
</ul><h3>Consulte tambi�n</h3><ul class="seealso"><li><a href="#comments_section">Comentarios</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="uptodate" id="uptodate">Mantenerse al D�a</a></h2>

    <p>El Servidor Apache HTTP tiene un buen historial de seguridad y comunidad de desarrolladores con una alta preocupaci�n por los problemas de seguridad. Pero ser� inevitable que algunos problemas -- peque�os o grandes -- sean descubiertos en el software despu�s de que �ste ha sido publicado. Por esta raz�n, es crucial estar al tanto de las actualizaciones de software.  Si ha obtenido su versi�n del Servidor HTTP directamente de Apache, le recomendamos encarecidamente que se suscriba a la <a href="http://httpd.apache.org/lists.html#http-announce">Lista de Anuncios del Servidor Apache HTTP</a> donde puede estar informado de nuevas versiones y actualizaciones de seguridad. Hay servicios similares disponibles desde la mayor�a de distribuidores de terceros del Software Apache.</p>

    <p>Desde luego, la mayor parte de las veces que el servidor web se ve comprometido, no es por problemas en el c�digo del Servidor HTTP. Si no, m�s bien ocurre por problemas en c�digo externo, scripts CGI, o el sistema operativo sobre el que se opera. Debe entonces estar al tanto de los problemas y actualizaciones de todo el software en su sistema.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="dos" id="dos">Ataques de Denegaci�n de Servicio (DoS, Denial of Service)</a></h2>

    

    <p>Todos los servicios de red pueden ser objeto de ataques de denegaci�n de servicio que intentan evitar que haya respuestas a clientes mediante la limitaci�n o bloqueo de recursos en el servidor. No es posible prevenir tales ataques completamente, pero puede hacer ciertas cosas para mitigar los problemas que generan.</p>

    <p>A menudo la herramienta m�s efectiva anti-DoS ser� un cortafuegos u otras configuraciones del sistema operativo. Por ejemplo, la mayor�a de los cortafuegos pueden configurarse para restringir el n�mero de conexiones simult�neas de una misma direcci�n IP o red, y de esta manera prevenir un rango de ataques sencillos. Pero desde luego esto no es de ayuda contra un Ataque Distribuido de Denegaci�n de Servicio (DDoS).</p>

    <p>Hay ciertas configuraciones del servidor Apache HTTP que pueden ayudar a mitigar problemas:</p>

    <ul>
      <li>La directiva <code class="directive"><a href="../mod/mod_reqtimeout.html#requestreadtimeout">RequestReadTimeout</a></code>
      permite limitar el tiempo que un cliente tarda en enviar una petici�n.</li>

      <li>El valor de la directiva <code class="directive"><a href="../mod/core.html#timeout">TimeOut</a></code> deber�a reducirse en sitios que son objeto de ataques DoS. Configurar �sta a unos segundos podr�a ser apropiado. Como <code class="directive"><a href="../mod/core.html#timeout">TimeOut</a></code> se usa en realidad para distintas operaciones diferentes, configurar �sta a un valor muy bajo puede introducir problemas a largo plazo en scripts CGI que se ejecuten durante m�s de la cuenta.</li>

      <li>La directiva <code class="directive"><a href="../mod/core.html#keepalivetimeout">KeepAliveTimeout</a></code> tambi�n puede reducirse en sitios que son objeto de ataques DoS. Algunos sitios incluso desactivan los keepalives completamente con
      <code class="directive"><a href="../mod/core.html#keepalive">KeepAlive</a></code>, lo cual por supuesto genera otros inconvenientes en el rendimiento.</li>

      <li>Deber�an comprobarse tambi�n los valores de las directivas de timeout facilitadas por otros m�dulos.</li>

      <li>Las directivas
      <code class="directive"><a href="../mod/core.html#limitrequestbody">LimitRequestBody</a></code>,
      <code class="directive"><a href="../mod/core.html#limitrequestfields">LimitRequestFields</a></code>,
      <code class="directive"><a href="../mod/core.html#limitrequestfieldsize">LimitRequestFieldSize</a></code>,
      <code class="directive"><a href="../mod/core.html#limitrequestline">LimitRequestLine</a></code>, y
      <code class="directive"><a href="../mod/core.html#limitxmlrequestbody">LimitXMLRequestBody</a></code>
      deber�an configurarse cuidadosamente para limitar el consumo de recursos desencadenado por las entradas del cliente.</li>

      <li>En sistemas operativos que lo soporten, aseg�rese de que usa la directiva <code class="directive"><a href="../mod/core.html#acceptfilter">AcceptFilter</a></code> para descargar parte del procesamiento de la petici�n al sistema operativo. Est� activa por defecto en Apache httpd, pero puede que sea necesaria configuraci�n en su kernel.</li>

      <li>Ajuste la directiva <code class="directive"><a href="../mod/mpm_common.html#maxrequestworkers">MaxRequestWorkers</a></code> para permitir al servidor gestionar el m�ximo n�mero de conexiones simult�neas sin quedarse sin recursos.  Tambi�n vea la <a href="perf-tuning.html">documentaci�n de ajuste de rendimiento</a>.</li>

      <li>Usar un <a href="../mpm.html">mpm</a> multihilo puede permitirle gestionar m�s conexiones simult�neas, mitigando as� ataques DoS. Incluso el mpm <code class="module"><a href="../mod/event.html">event</a></code> usa procesamiento as�ncrono para evitar dedicar un hilo a cada conexi�n.
      </li>
    </ul>
  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="serverroot" id="serverroot">Permisos en Directorios ServerRoot</a></h2>

    

    <p>Generalmente, Apache se arranca con el usuario root, y �ste cambia a un usuario definido con la directiva    <code class="directive"><a href="../mod/mod_unixd.html#user">User</a></code> para servir peticiones. Como es el caso con cualquier comando que ejecuta root, debe tener cuidado de que est� protegido de modificaci�n por usuarios que no sean root. No solo los ficheros deben poder escribirse solo por root, pasa lo mismo con los directorios, y todos los directorios precedentes. Por ejemplo, si escoge colocar ServerRoot en <code>/usr/local/apache</code> entonces se sugiere que genere ese directorio como root, con comandos como estos:</p>

    <div class="example"><p><code>
      mkdir /usr/local/apache <br />
      cd /usr/local/apache <br />
      mkdir bin conf logs <br />
      chown 0 . bin conf logs <br />
      chgrp 0 . bin conf logs <br />
      chmod 755 . bin conf logs
    </code></p></div>

    <p>Se asume que <code>/</code>, <code>/usr</code>, y
    <code>/usr/local</code> son solo modificables por root. Cuando instala el ejecutable <code class="program"><a href="../programs/httpd.html">httpd</a></code>, debe asegurarse de que est� protegido de manera similar:</p>

    <div class="example"><p><code>
      cp httpd /usr/local/apache/bin <br />
      chown 0 /usr/local/apache/bin/httpd <br />
      chgrp 0 /usr/local/apache/bin/httpd <br />
      chmod 511 /usr/local/apache/bin/httpd
    </code></p></div>

    <p>Puede generar un subdirectorio htdocs que sea modificable por otros usuarios -- puesto que root nunca ejecuta ficheros en ese directorio y no deber�a estar generando ficheros ah�.</p>

    <p>Si permite a usuarios no-root modificar cualquier fichero que root ejecute o escriba, entonces est� permitiendo que root sea comprometido. Por ejemplo, alquien podr�a reemplazar el binario <code class="program"><a href="../programs/httpd.html">httpd</a></code> de manera que la pr�xima vez que lo arrancara, ejecutar�a un c�digo arbitrario. Si el directorio de logs es modificable (por un usuario no-root), alguien podr�a reemplazar un fichero de log con un enlace simb�lico a otro fichero de sistema, y entonces root podr�a sobreescribir ese fichero con datos arbitrarios. Si los ficheros de log son modificables (por un usuario no-root), entonces alguien podr�a sobreescribir el fichero de log con datos inservibles.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="ssi" id="ssi">Server Side Includes (Inclusiones en la parte Servidor)</a></h2>

    

    <p>Los Server Side Includes (SSI) enfrentan a un administrador de servidores con varios riesgos de seguridad potenciales.</p>

    <p>El primer riesgo es el incremento de carga en el servidor. Todos los ficheros activados para SSI son escrutados por Apache, tengan o no tengan directivas SSI incluidas dentro del fichero. Aunque esta carga es menor, en un entorno de servidor compartido puede ser significativa.</p>

    <p>Los ficheros SSI tambi�n conllevan los mismos riesgos asociados con los scripts CGI en general. Usando el elemento <code>exec cmd</code>, los ficheros activados para SSI pueden ejecutar cualquier script CGI o programa bajo los permisos del usuario y grupo con los que se ejecuta Apache, tal y como est� configurado en
    <code>httpd.conf</code>.</p>

    <p>Hay formas de mejorar la seguridad de los ficheros SSI mientras se obtienen los beneficios que proveen.</p>

    <p>Para aislar el da�o que un fichero SSI caprichoso puede causar, un administrador de servidor puede habilitar <a href="../suexec.html">suexec</a> como se describe en la secci�n <a href="#cgi">CGI en General</a>.</p>

    <p>Activar SSI para ficheros con extensiones <code>.html</code> o <code>.htm</code> puede ser peligroso. Esto puede darse especialmente en un entorno de servidor compartido y que tenga bastante carga. Los ficheros habilitados para SSI deber�an tener una extensi�n diferente, como la t�pica <code>.shtml</code>. Esto ayuda a mantener la carga de servidor al m�nimo y permite una gesti�n m�s sencilla del riesgo.</p>

    <p>Otra soluci�n es deshabilitar la capacidad de ejecutar scripts y programas desde p�ginas SSI. Para hacer esto sustituya <code>Includes</code> con <code>IncludesNOEXEC</code> en la directiva <code class="directive"><a href="../mod/core.html#options">Options</a></code>. Tenga en cuenta que los usuarios podr�an todav�a usar <code>&lt;--#include virtual="..." --&gt;</code> para ejecutar scripts CGI si estos scripts est�n en directorios designados por la directiva <code class="directive"><a href="../mod/mod_alias.html#scriptalias">ScriptAlias</a></code>.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="cgi" id="cgi">CGI en General</a></h2>

    

    <p>Primero, siempre tiene que recordar que debe confiar en los desarrolladores de scripts/programas CGI o su habilidad para localizar agujeros potenciales de seguridad en CGI, sean deliberados o accidentales. Los scripts CGI pueden ejecutar comandos de manera arbitraria en su sistema con los permisos del usuario del servidor web y pueden por tanto ser extremadamente peligrosos si no se revisan cuidadosamente.</p>

    <p>Todos los scripts CGI se ejecutar�n con el mismo usuario, as� que tienen potencial para el conflicto (accidental o deliberado) con otros scripts p. ej. Usuario A odia a Usuario B, as� que escribe un script para borrar la base de datos CGI del usuario B. Un programa que puede usarse para permitir que scripts se ejecuten como distintos usuarios es <a href="../suexec.html">suEXEC</a> que est� incluido con Apache desde la versi�n 1.2 y es llamado desde hooks especiales en el c�digo del servidor Apache. Otra forma popular de hacer esto es con <a href="http://cgiwrap.sourceforge.net/">CGIWrap</a>.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="nsaliasedcgi" id="nsaliasedcgi">CGI sin Alias de Script</a></h2>

    

    <p>Permitir a usuarios ejecutar scripts CGI en cualquier directorio solo deber�a considerarse si:</p>

    <ul>
      <li>Conf�a en que los usuarios no escribir�n scripts que deliberada o accidentalmente expondr�n su sistema a un ataque.</li>
      <li>Considera que la seguridad de su sitio es tan d�bil en otras �reas, que tener un agujero potencial de seguridad sea irrelevante.</li>
      <li>No tiene usuarios, y nadie visita su servidor nunca.</li>
    </ul>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="saliasedcgi" id="saliasedcgi">CGI con Alias de Script</a></h2>

    

    <p>Limitar CGI a directorios especiales le da al administrador control sobre lo que ocurre en esos directorios. Esto es indudablemente m�s seguro que CGI sin Alias de Script, pero solo si los usuarios con acceso de escritura a esos directorios son de fiar o el administrador comprueba cada programa/script por si tiene agujeros de seguridad potenciales.</p>

    <p>La mayor parte de los sitios eligen esta opci�n en lugar del m�todo CGI sin Alias de Script.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="dynamic" id="dynamic">Otras fuentes de contenido din�mico</a></h2>

  

  <p>Opciones de script embebido que se ejecutan como parte del mismo servidor, tales como <code>mod_php</code>, <code>mod_perl</code>, <code>mod_tcl</code>,
  y <code>mod_python</code>, se ejecutan con la misma identidad que el servidor (vea la directiva <code class="directive"><a href="../mod/mod_unixd.html#user">User</a></code>), y por tanto scripts que se ejecuten por estos motores pueden potencialmente acceder a cualquier cosa que el servidor pueda. Algunos motores de scripting pueden proveer restricciones, pero es mejor asumir que no lo hacen.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="dynamicsec" id="dynamicsec">Seguridad de Contenido Din�mico</a></h2>

  

  <p>Cuando se configura contenido din�mico, como por ejemplo <code>mod_php</code>, <code>mod_perl</code> o <code>mod_python</code>, muchas consideraciones de seguridad escapan al �mbito del mismo <code>httpd</code>, y necesita consultar la documnetaci�n de estos m�dulos. Por ejemplo, PHP le permite configurar un <a href="http://www.php.net/manual/en/ini.sect.safe-mode.php">Modo Seguro</a>, que generalmente est� deshabilitado por defecto. Otro ejemplo es <a href="http://www.hardened-php.net/suhosin/">Suhosin</a>, un addon PHP para m�s seguridad. Para m�s informaci�n sobre estos, consulte la documnetaci�n de cada projecto.</p>

  <p>A nivel de Apache, un m�dulo que se llama <a href="http://modsecurity.org/">mod_security</a> puede ser considerado como un firewall HTTP y, asumiento que lo configura correctamente, puede ayudarle a mejorar la seguridad de su contenido din�mico.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="systemsettings" id="systemsettings">Configuraci�n de Protecci�n del Sistema</a></h2>

    

    <p>Para tener un sistema muy seguro, querr� impedir que los usuarios configuren ficheros <code>.htaccess</code> que pueden invalidar caracter�sticas de seguridad que usted haya configurado. Esta es una manera de hacerlo.</p>

    <p>En el fichero de configuraci�n del servidor, ponga</p>

    <pre class="prettyprint lang-config">&lt;Directory "/"&gt;
    AllowOverride None
&lt;/Directory&gt;</pre>


    <p>Esto previene el uso de ficheros <code>.htaccess</code> en todos los directorios aparte de aquellos habilitados espec�ficamente.</p>

    <p>Tenga en cuenta que este es el valor por defecto desde Apache HTTPD 2.3.9.</p>

  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="protectserverfiles" id="protectserverfiles">Proteger Ficheros del Servidor por Defecto</a></h2>

    

    <p>Un aspecto de Apache que ocasionalmente se malinterpreta es el acceso por defecto. Esto es, a menos que tome medidas para cambiarlo, el servidor puede encontrar su camino hacia un fichero a trav�s reglas de mapeo de URL, que puede servir a los clientes.</p>

    <p>Considere el siguiente ejemplo:</p>

    <div class="example"><p><code>
      # cd /; ln -s / public_html <br />
      Accessing <code>http://localhost/~root/</code>
    </code></p></div>

    <p>Esto permitir�a clientes navegar por el sistema de ficheros al completo. Para corregir esto, a�ada el siguiente bloque a la configuraci�n del servidor:</p>

    <pre class="prettyprint lang-config">&lt;Directory "/"&gt;
    Require all denied
&lt;/Directory&gt;</pre>


    <p>Esto prohibir� el acceso por defecto a ubicaciones del sistema de ficheros. A�ada despu�s bloques apropiados de <code class="directive"><a href="../mod/core.html#directory">Directory</a></code> para aquellas �reas a las que quiera dar acceso. Por ejemplo,</p>

    <pre class="prettyprint lang-config">&lt;Directory "/usr/users/*/public_html"&gt;
    Require all granted
&lt;/Directory&gt;
&lt;Directory "/usr/local/httpd"&gt;
    Require all granted
&lt;/Directory&gt;</pre>


    <p>Preste atenci�n a las interacciones de las directivas <code class="directive"><a href="../mod/core.html#location">Location</a></code> y <code class="directive"><a href="../mod/core.html#directory">Directory</a></code>; por ejemplo, incluso si <code>&lt;Directory "/"&gt;</code> deniega el acceso, una directiva <code>&lt;Location "/"&gt;</code> puede anularlo. (Aunque tenga en cuenta que Location representa paths virtuales relativos a partir del especificado en DocumentRoot)</p>

    <p>Tambi�n tenga cuidado jugando con la directiva <code class="directive"><a href="../mod/mod_userdir.html#userdir">UserDir</a></code>; configurarla a algo como <code>./</code> tendr�a el mismo efecto, para root, como el primer ejemplo indicado previamente. Le recomendamos encarecidamente que incluya la siguiente l�nea en sus ficheros de configuraci�n del servidor:</p>

    <pre class="prettyprint lang-config">UserDir disabled root</pre>


  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="watchyourlogs" id="watchyourlogs">Examinando sus Logs</a></h2>

    

    <p>Para estar al d�a en lo que est� a su servidor debe examinar los <a href="../logs.html">Ficheros de Log</a>. Incluso aunque los ficheros de log solo reporten lo que ya ha pasado, le facilitar�n entender qu� ataques se han enviado a su servidor y comprobar si tiene configurado el nivel necesario de seguridad.</p>

    <p>Un par de ejemplos:</p>

    <div class="example"><p><code>
      grep -c "/jsp/source.jsp?/jsp/ /jsp/source.jsp??" access_log <br />
      grep "client denied" error_log | tail -n 10
    </code></p></div>

    <p>El primer ejemplo le ense�ar� una lista de ataques intentando explotar la
    <a href="http://online.securityfocus.com/bid/4876/info/">Vulnerabilidad de Revelado de Informaci�n de Apache Tomcat con Peticiones Malformadas Source.JSP</a>, el segundo ejemplo listar� los �ltimos 10 clientes a los que se les ha denegado el acceso, por ejemplo:</p>

    <div class="example"><p><code>
      [Thu Jul 11 17:18:39 2002] [error] [client foo.example.com] client denied
      by server configuration: /usr/local/apache/htdocs/.htpasswd
    </code></p></div>

    <p>Como puede ver, los ficheros de log solo muestran lo que ya ha pasado, as� que si el cliente ha podido acceder al fichero <code>.htpasswd</code> ver�a algo similar a:</p>

    <div class="example"><p><code>
      foo.example.com - - [12/Jul/2002:01:59:13 +0200] "GET /.htpasswd HTTP/1.1 200"
    </code></p></div>

    <p>en su <a href="../logs.html#accesslog">Log de Acceso</a>. Esto significa que usted probablemente deshabilit� lo siguiente en su fichero de configuraci�n:</p>

    <pre class="prettyprint lang-config">&lt;Files ".ht*"&gt;
    Require all denied
&lt;/Files&gt;</pre>


  </div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="merging" id="merging">Fusi�n de secciones de configuraci�n</a></h2>

    

    <p>La fusi�n de secciones de configuraci�n es complicada y a veces espec�fica de ciertas directivas. Compruebe siempre sus cambios cuando genere dependencias en directivas que se fusionan.</p>

    <p>Para m�dulos que no implementan la l�gica de fusi�n, tales como <code class="directive">mod_access_compat</code>, el comportamiento en las secciones posteriores dependen de si estas tienen alguna directiva del m�dulo. La configuraci�n se hereda hasta que se realiza alg�n cambio, y en ese punto la configuraci�n se <em>reemplaza</em> no se fusiona.</p>
  </div></div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/misc/security_tips.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/misc/security_tips.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/misc/security_tips.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ko/misc/security_tips.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../tr/misc/security_tips.html" hreflang="tr" rel="alternate" title="T�rk�e">&nbsp;tr&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/misc/security_tips.html';
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