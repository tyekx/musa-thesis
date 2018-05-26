<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_status - Servidor HTTP Apache Versi�n 2.5</title>
<link href="../style/css/manual.css" rel="stylesheet" media="all" type="text/css" title="Main stylesheet" />
<link href="../style/css/manual-loose-100pc.css" rel="alternate stylesheet" media="all" type="text/css" title="No Sidebar - Default font size" />
<link href="../style/css/manual-print.css" rel="stylesheet" media="print" type="text/css" /><link rel="stylesheet" type="text/css" href="../style/css/prettify.css" />
<script src="../style/scripts/prettify.min.js" type="text/javascript">
</script>

<link href="../images/favicon.ico" rel="shortcut icon" /></head>
<body>
<div id="page-header">
<p class="menu"><a href="../mod/">M�dulos</a> | <a href="../mod/quickreference.html">Directivas</a> | <a href="http://wiki.apache.org/httpd/FAQ">Preguntas Frecuentes</a> | <a href="../glossary.html">Glosario</a> | <a href="../sitemap.html">Mapa del sitio web</a></p>
<p class="apache">Versi�n 2.5 del Servidor HTTP Apache</p>
<img alt="" src="../images/feather.png" /></div>
<div class="up"><a href="./"><img title="&lt;-" alt="&lt;-" src="../images/left.gif" /></a></div>
<div id="path">
<a href="http://www.apache.org/">Apache</a> &gt; <a href="http://httpd.apache.org/">Servidor HTTP</a> &gt; <a href="http://httpd.apache.org/docs/">Documentaci�n</a> &gt; <a href="../">Versi�n 2.5</a> &gt; <a href="./">M�dulos</a></div>
<div id="page-content">
<div id="preamble"><h1>M�dulo Apache mod_status</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_status.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_status.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_status.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_status.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_status.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../tr/mod/mod_status.html" hreflang="tr" rel="alternate" title="T�rk�e">&nbsp;tr&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Provee informaci�n de la actividad y rendimiento del 
  servidor</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>status_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_status.c</td></tr></table>
<h3>Resumen de contenidos</h3>

    <p>El m�dulo de Estado permite a un administrador averiguar lo bien que est�
    rindiendo su servidor. Se presenta una p�gina HTML que da las estad�sticas
    actuales del servidor en una forma f�cilmente legible. Si es necesario
    se puede hacer que �sta p�gina se refresque autom�ticamente (con un navegador
    compatible). Tambi�n hay otra p�gina que da una sencilla lista legible por 
    m�quina del estado actual del servidor.</p>

    <p>Los detalles que se dan son:</p>

    <ul>
      <li>El n�mero de worker sirviendo peticiones</li>

      <li>El n�mero de worker desocupado</li>

      <li>El estado de cada worker, el n�mero de peticiones que ese worker ha
      realizado y el n�mero total de bytes servido por el worker (*)</li>

      <li>Un n�mero total de accesos y recuento de bytes servidos (*)</li>

      <li>La hora a la que el servidor ha sido arrancado/reiniciado y el tiempo
      que se ha estado ejecutando</li>

      <li>Medias indicando el n�mero de peticiones por segundo, el n�mero de bytes
      servido por segundo y la media de bytes por petici�n (*)</li>

      <li>El porcentaje actual de CPU usado por cada worker y en total por todos
      los workers al completo (*)</li>

      <li>Los hosts actuales y peticiones que se est�n procesando en el momento
       (*)</li>
    </ul>

    <p>Las l�neas marcadas con "(*)" solo est�n disponibles si
    <code class="directive"><a href="../mod/core.html#extendedstatus">ExtendedStatus</a></code> est� configurado a
    <code>On</code>.  En la versi�n 2.3.6, cargar mod_status pondr�
    <code class="directive"><a href="../mod/core.html#extendedstatus">ExtendedStatus</a></code> en On por defecto.</p>

    <div class="note">
      <strong>Deber�a tenerse en cuenta que si se carga 
      <code class="module"><a href="../mod/mod_status.html">mod_status</a></code> en el servidor, su handler estar� disponible
      en <em>todos</em> los ficheros de configuraci�n, incluidos ficheros
      <em>de</em>-directorio (<em>p. ej.</em>, <code>.htaccess</code>). Esto puede tener ramificaciones relacionadas con la seguridad en su sitio web.</strong>
    </div>

</div>
<div id="quickview"><h3>Temas</h3>
<ul id="topics">
<li><img alt="" src="../images/down.gif" /> <a href="#enable">Activando el Soporte de Estado</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#autoupdate">Actualizaciones Autom�ticas</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#machinereadable">Fichero de Estado legible por m�quina</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#troubleshoot">Usando server-status para identificar problemas</a></li>
</ul><h3 class="directives">Directivas</h3>
<p>Este m�dulo no suministra ninguna
            directiva.</p>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_status">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_status">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><a href="#comments_section">Comentarios</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="enable" id="enable">Activando el Soporte de Estado</a></h2>
    

    <p>Para activar los reportes de estado para navegadores t�n solo desde el 
    dominio example.com a�ada este c�digo en su fichero de configuraci�n 
    <code>httpd.conf</code></p>
<pre class="prettyprint lang-config">&lt;Location "/server-status"&gt;
    SetHandler server-status
    Require host example.com
&lt;/Location&gt;</pre>


    <p>Ahora puede acceder a estad�sticas del servidor usando un navegador web
    para acceder a la p�gina
    <code>http://your.server.name/server-status</code></p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="autoupdate" id="autoupdate">Actualizaciones Autom�ticas</a></h2>

    
    <p>Puede hacer que la p�gina de estado se actualice autom�ticamente si tiene
    un navegador que soporte "refresh". Acceda a la p�gina
    <code>http://your.server.name/server-status?refresh=N</code> para refrescar
    la p�gina cada N segundos.</p>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="machinereadable" id="machinereadable">Fichero de Estado legible por m�quina</a></h2>

    
    <p>Una versi�n legible por m�quina del fichero de estado est� disponible
    accediendo a la p�gina 
    <code>http://your.server.name/server-status?auto</code>. Esto es �til cuando
    la solicitud de estado se lanza autom�ticamente, vea el programa Perl 
    <code>log_server_status</code>, que encontrar� en el directorio 
    <code>/support</code> de su instalaci�n del Servidor Apache HTTP.</p>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="troubleshoot" id="troubleshoot">Usando server-status para identificar problemas</a></h2>
    

    <p>La p�gina <code>server-status</code> puede usarse como un lugar donde
    empezar a identificar problemas en una situaci�n en la que su servidor est�
    consumiento todos los recursos disponibles (CPU o memoria), y ust�d desea
    identificar qu� peticiones o clientes est�n causando el problema.</p>

    <p>Primero, aseg�rese de que tiene <code class="directive"><a href="../mod/core.html#extendedstatus">ExtendedStatus</a></code> configurado a on, de manera que 
    puede ver toda la informaci�n de la petici�n y el cliente para cada proceso
    o hilo.</p>

    <p>Ahora mire en la lista de procesos (usando <code>top</code>, o utilidad
    similar para ver procesos) para identificar los procesos espec�ficos
    que son los principales culpables. Ordene la salida de <code>top</code> por
    uso de CPU, o de memoria, dependiendo del problema que est� intentando 
    ubicar.</p>

    <p>Recargue la p�gina <code>server-status</code>, y busque esos ids de
    proceso, y podr� ver qu� petici�n se est� sirviendo por ese proceso y para
    qu� cliente. Las peticiones son pasajeras, as� que puede que necesite
    intentarlo varias veces antes de que lo cace en el acto, por decirlo de 
    alguna manera.</p>

    <p>Este proceso <em>deber�a</em> darle alguna idea de qu� cliente, o qu�
    tipo de petici�n, son los principales responsables para sus problemas de
    carga. A menudo identificar� una aplicaci�n web en particular que puede 
    estar comport�ndose como no es debido, o un cliente en particular que est�
    atacando su sitio web.</p>

</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_status.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_status.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_status.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_status.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_status.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a> |
<a href="../tr/mod/mod_status.html" hreflang="tr" rel="alternate" title="T�rk�e">&nbsp;tr&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_status.html';
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