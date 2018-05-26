<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_allowhandlers - Servidor HTTP Apache Versi�n 2.5</title>
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
<div id="preamble"><h1>M�dulo Apache mod_allowhandlers</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_allowhandlers.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_allowhandlers.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_allowhandlers.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Restringir f�cilmente qu� handlers HTTP pueden ser usados en el servidor</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Experimental</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>allowhandlers_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_allowhandlers.c</td></tr></table>
<h3>Resumen de contenidos</h3>

<p>�ste m�dulo hace que sea f�cil restringir qu� handlers podr�an usarse para una petici�n. Una posible configuraci�n ser�a:</p>

<pre class="prettyprint lang-config">&lt;Location "/"&gt;
  AllowHandlers not server-info server-status balancer-manager ldap-status
&lt;/Location&gt;</pre>


<p>Tambi�n registra un handler llamado <code>forbidden</code> que sencillamente devuelve 403 FORBIDDEN al cliente. Esto se puede usar con directivas como
<code class="directive"><a href="../mod/mod_mime.html#addhandler">AddHandler</a></code>.</p>

</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#allowhandlers">AllowHandlers</a></li>
</ul>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_allowhandlers">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_allowhandlers">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><code class="directive"><a href="../mod/core.html#sethandler">SetHandler</a></code></li>
<li><code class="directive"><a href="../mod/mod_mime.html#addhandler">AddHandler</a></code></li>
<li><a href="#comments_section">Comentarios</a></li></ul></div>

<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="allowhandlers" id="allowhandlers">Directiva</a> <a name="AllowHandlers" id="AllowHandlers">AllowHandlers</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Restringe acceso a los handlers listados</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AllowHandlers [not] none|<em>handler-name</em>
[none|<em>handler-name</em>]...</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>AllowHandlers all</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Experimental</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_allowhandlers</td></tr>
</table>

<p>Los nombres de handler son sensibles a may�sculas. El nombre especial
<code>none</code> puede usarse para hacer coincidir may�sculas donde no se ha configurado ning�n handler. El valor especial <code>all</code> puede usarse para permitir todos los handlers otra vez en una secci�n de configuraci�n posterior, incluso si algunas cabeceras fueron denegadas previamente en el orden de fusi�n de la configuraci�n:</p>

<pre class="prettyprint lang-config">&lt;Location "/server-status"&gt;
  AllowHandlers all
  SetHandler server-status
&lt;/Location&gt;</pre>



</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_allowhandlers.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_allowhandlers.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_allowhandlers.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_allowhandlers.html';
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