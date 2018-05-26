<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_actions - Servidor HTTP Apache Versi�n 2.5</title>
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
<div id="preamble"><h1>M�dulo Apache mod_actions</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/mod_actions.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/mod_actions.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_actions.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_actions.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_actions.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_actions.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Ejecuta scripts CGI bas�ndose en el tipo de medio o m�todo de la petici�n.</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>actions_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_actions.c</td></tr></table>
<h3>Resumen de contenidos</h3>

    <p>Este m�dulo tiene dos directivas. La directiva <code class="directive"><a href="#action">Action</a></code> le permite ejecutar scripts CGI siempre que se solicite un fichero con cierto  <a class="glossarylink" href="../glossary.html#mime-type" title="ver glosario">tipo de contenido MIME</a>. La direcitiva 
    <code class="directive"><a href="#script">Script</a></code> le permite ejecutar scripts CGI siempre que se use un m�todo concreto en una petici�n. Esto hace mucho m�s f�cil ejecutar scripts para procesar ficheros.</p>
</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#action">Action</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#script">Script</a></li>
</ul>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_actions">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_actions">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><code class="module"><a href="../mod/mod_cgi.html">mod_cgi</a></code></li>
<li><a href="../howto/cgi.html">Contenido Din�mico con CGI</a></li>
<li><a href="../handler.html">Uso de Handler de Apache httpd</a></li>
<li><a href="#comments_section">Comentarios</a></li></ul></div>

<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="action" id="action">Directiva</a> <a name="Action" id="Action">Action</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa un script CGI para un handler concreto o content-type</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>Action <var>action-type</var> <var>cgi-script</var> [virtual]</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>FileInfo</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_actions</td></tr>
</table>
    <p>Esta directiva a�ade una acci�n, que activar� <var>cgi-script</var> cuando <var>action-type</var> se activa por una petici�n. El <var>cgi-script</var> es el path-de-URL a un recurso designado como un script CGI script usando 
    <code class="directive"><a href="../mod/mod_alias.html#scriptalias">ScriptAlias</a></code> o 
    <code class="directive"><a href="../mod/mod_mime.html#addhandler">AddHandler</a></code>. El 
    <var>action-type</var> puede ser un <a href="../handler.html">handler</a> o un <a class="glossarylink" href="../glossary.html#mime-type" title="ver glosario">tipo de contenido MIME</a>. Env�a la URL y el path al fichero del documento solicitado usando las variables de entorno est�ndar de CGI <code>PATH_INFO</code> y <code>PATH_TRANSLATED</code>. El handler que se usa para esta petici�n en particular se env�a usando la variable <code>REDIRECT_HANDLER</code>.</p>

    <div class="example"><h3>Ejemplo: tipo MIME</h3><pre class="prettyprint lang-config"># Petici�n de ficheros de un tipo concreto de contenido MIME:
Action image/gif /cgi-bin/images.cgi</pre>
</div>

    <p>En este ejemplo, las peticiones de ficheros con contenido tipo MIME <code>image/gif</code> ser�n gestionadas por el script cgi especificado en <code>/cgi-bin/images.cgi</code>.</p>

    <div class="example"><h3>Ejemplo: Extensi�n de fichero</h3><pre class="prettyprint lang-config"># Ficheros con una extensi�n concreta
AddHandler my-file-type .xyz
Action my-file-type /cgi-bin/program.cgi</pre>
</div>
    <p>En este ejemplo, las peticiones a ficheros con una extensi�n de fichero
    <code>.xyz</code> ser�n gestionadas por el script cgi especificado en
    <code>/cgi-bin/program.cgi</code>.</p>

    <p>El modificador opcional <code>virtual</code> desactiva la comprobaci�n para saber si el fichero realmente existe. Esto es �til, por ejemplo, si quiere usar la directiva <code class="directive">Action</code> en ubicaciones virtuales.</p>

    <pre class="prettyprint lang-config">&lt;Location "/news"&gt;
    SetHandler news-handler
    Action news-handler /cgi-bin/news.cgi virtual
&lt;/Location&gt;</pre>


<h3>Consulte tambi�n</h3>
<ul>
<li><code class="directive"><a href="../mod/mod_mime.html#addhandler">AddHandler</a></code></li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="script" id="script">Directiva</a> <a name="Script" id="Script">Script</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa un script CGI para peticiones con un m�todo concreto.</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>Script <var>method</var> <var>cgi-script</var></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_actions</td></tr>
</table>
    <p>Esta directiva a�ade una acci�n, que activar� <var>cgi-script</var> cuando se solicita un fichero usando un m�todo especificado en el par�metro <var>method</var>. El <var>cgi-script</var> es el path-de-URL al recurso que ha sido designado como un script CGI usando <code class="directive"><a href="../mod/mod_alias.html#scriptalias">ScriptAlias</a></code> o <code class="directive"><a href="../mod/mod_mime.html#addhandler">AddHandler</a></code>. La URL y la ruta al fichero del documento solicitado se env�a usando las variables de entorno est�ndar de CGI <code>PATH_INFO</code> y <code>PATH_TRANSLATED</code>.</p>

    <div class="note">
      Se puede usar cualquier nombre de m�todo arbitrario. <strong>Los nombres de M�todo son sensibles a may�sculas</strong>, as� que <code>Script PUT</code> and <code>Script put</code> tienen dos efectos totalmente diferentes.
    </div>

    <p>Tenga en cuenta que el comando <code class="directive">Script</code> solo define acciones por defecto. Si se llama a un script CGI, o alg�n otro recurso que est� capacitado para gestionar el m�todo solicitado internamente, �ste se utilizar�. Tambi�n tenga en cuenta que solo se invocar� <code class="directive">Script</code> con un m�todo <code>GET</code> si hay par�metros de query string presentes en la petici�n (<em>p.e.</em>, foo.html?hi). Si no, la petici�n se procesar� normalmente.</p>

    <pre class="prettyprint lang-config"># todas las peticiones GET van aqu�
Script GET /cgi-bin/search

# Un handler PUT de CGI
Script PUT /~bob/put.cgi</pre>


</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../de/mod/mod_actions.html" hreflang="de" rel="alternate" title="Deutsch">&nbsp;de&nbsp;</a> |
<a href="../en/mod/mod_actions.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_actions.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_actions.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_actions.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_actions.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_actions.html';
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