<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_auth_basic - Servidor HTTP Apache Versi�n 2.5</title>
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
<div id="preamble"><h1>M�dulo Apache mod_auth_basic</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_auth_basic.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_auth_basic.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_auth_basic.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_auth_basic.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_auth_basic.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Autenticaci�n HTTP B�sica</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>auth_basic_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_auth_basic.c</td></tr></table>
<h3>Resumen de contenidos</h3>

    <p>Este m�dulo permite el uso de Autenticaci�n HTTP B�sica para restringir acceso buscando usuarios en los proveedores configurados.
    La autenticaci�n HTTP Digest la facilita el m�dulo
    <code class="module"><a href="../mod/mod_auth_digest.html">mod_auth_digest</a></code>.  Este m�dulo deber�a combinarse generalmente con al menos un m�dulo de autenticaci�n como <code class="module"><a href="../mod/mod_authn_file.html">mod_authn_file</a></code> y uno de autorizaci�n como <code class="module"><a href="../mod/mod_authz_user.html">mod_authz_user</a></code>.</p>
</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#authbasicauthoritative">AuthBasicAuthoritative</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#authbasicfake">AuthBasicFake</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#authbasicprovider">AuthBasicProvider</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#authbasicusedigestalgorithm">AuthBasicUseDigestAlgorithm</a></li>
</ul>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_auth_basic">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_auth_basic">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><code class="directive"><a href="../mod/mod_authn_core.html#authname">AuthName</a></code></li>
<li><code class="directive"><a href="../mod/mod_authn_core.html#authtype">AuthType</a></code></li>
<li><code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code></li>
<li><a href="../howto/auth.html">Authentication howto</a></li>
<li><a href="#comments_section">Comentarios</a></li></ul></div>

<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="authbasicauthoritative" id="authbasicauthoritative">Directiva</a> <a name="AuthBasicAuthoritative" id="AuthBasicAuthoritative">AuthBasicAuthoritative</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura si se pasan autorizaci�n o autenticaci�n a los m�dulos de m�s bajo nivel</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AuthBasicAuthoritative On|Off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>AuthBasicAuthoritative On</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_auth_basic</td></tr>
</table>
    <p>Normalmente, cada m�dulo de autorizaci�n listado en 
    <code class="directive"><a href="#authbasicprovider">AuthBasicProvider</a></code>
    intentar� vefificar el usuario y si el usuario no se encuentra en ning�n proveedor, el acceso ser� denegado. Configurando la directiva
    <code class="directive">AuthBasicAuthoritative</code> de forma expl�cita a
    <code>Off</code> permite que ambos autenticaci�n y autorizaci�n sean pasados a otros m�dulos no-proveedores si <strong>no hay ID de usuario</strong> o 
    <strong>regla</strong> coincidente para el ID de usario facilitado.  Esto solo ser�a necesario cuando se combina <code class="module"><a href="../mod/mod_auth_basic.html">mod_auth_basic</a></code> con m�dulos de terceros que no est�n configurados con la directiva 
    <code class="directive"><a href="#authbasicprovider">AuthBasicProvider</a></code>. Cuando se usan tales m�dulos, el orden de procesamiento se determina en el c�digo fuente de los m�dulos y no es configurable.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="authbasicfake" id="authbasicfake">Directiva</a> <a name="AuthBasicFake" id="AuthBasicFake">AuthBasicFake</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Autenticaci�n b�sica falsa usando las expresiones facilitadas para usario y contrase�a</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AuthBasicFake off|username [password]</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_auth_basic</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Apache HTTP Server 2.4.5 y posteriores</td></tr>
</table>
    <p>El usuario y contrase�a especificados se combinan en una cabecera de Autorizaci�n, que se pasa al servidor o servicio detr�s del servidor web. Ambos cambios usuario y contrase�a son interpretrados usando el <a href="../expr.html">int�rprete de expresi�n</a>, que permite que tanto el usuario como la contrase�a se basen en los par�metros solicitados.</p>

    <p>Si la contrase�a no se especifica, se utilizar� el valor por defecto  "password".  Para desahabilitar la autenticaci�n b�sica falsa para una URL, especifique "AuthBasicFake off".</p>

    <p>En este ejemplo, enviamos un usuario y contrase�a fijos a un servidor backend.</p>

    <div class="example"><h3>Fixed Example</h3><pre class="prettyprint lang-config">&lt;Location "/demo"&gt;
    AuthBasicFake demo demopass
&lt;/Location&gt;</pre>
</div>

    <p>En este ejemplo, pasamos la direcci�n de email extraida de un certificado cliente, extendiendo la opci�n de funcionalidad de FakeBasicAuth dentro de la directiva <code class="directive"><a href="../mod/mod_ssl.html#ssloptions">SSLOptions</a></code>.  Como con la opci�n FakeBasicAuth, la contrase�a se configura a la cadena de caracteres espec�fica "password".</p>

    <div class="example"><h3>Ejemplo de Certificado</h3><pre class="prettyprint lang-config">&lt;Location "/secure"&gt;
    AuthBasicFake "%{SSL_CLIENT_S_DN_Email}"
&lt;/Location&gt;</pre>
</div>

    <p>Extendiendo el ejemplo de arriba, generamos una contrase�a encriptando la direcci�n email con una contrase�a fija, y pasando el resultado encriptado al servidor de backend.  Este m�todo se puede usar como puerta de acceso a sistemas antiguos que no dan soporte a certificados cliente.</p>

    <div class="example"><h3>Ejemplo de Contrase�a</h3><pre class="prettyprint lang-config">&lt;Location "/secure"&gt;
    AuthBasicFake "%{SSL_CLIENT_S_DN_Email}" "%{sha1:passphrase-%{SSL_CLIENT_S_DN_Email}}"
&lt;/Location&gt;</pre>
</div>

    <div class="example"><h3>Ejemplo de Exclusi�n</h3><pre class="prettyprint lang-config">&lt;Location "/public"&gt;
    AuthBasicFake off
&lt;/Location&gt;</pre>
</div>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="authbasicprovider" id="authbasicprovider">Directiva</a> <a name="AuthBasicProvider" id="AuthBasicProvider">AuthBasicProvider</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura el/los proveedor/es de autenticaci�n para esta 
ubicaci�n</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AuthBasicProvider <var>provider-name</var>
[<var>provider-name</var>] ...</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>AuthBasicProvider file</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_auth_basic</td></tr>
</table>
    <p>La directiva <code class="directive">AuthBasicProvider</code> configura qu� proveedor se usa para autenticar los usuarios en esta ubicaci�n. El 
    <code>fichero</code> proveedor por defecto se implementa con el m�dulo <code class="module"><a href="../mod/mod_authn_file.html">mod_authn_file</a></code>.  Aseg�rese de que el proveedor elegido est� presente en el servidor.</p>

    <div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">&lt;Location "/secure"&gt;
    AuthType basic
    AuthName "private area"
    AuthBasicProvider  dbm
    AuthDBMType        SDBM
    AuthDBMUserFile    "/www/etc/dbmpasswd"
    Require            valid-user
&lt;/Location&gt;</pre>
</div>

    <p>Se consulta a los proveedores en orden hasta que un proveedor encuentra una coincidencia para el nombre de usuario solicitado, y en este punto solo este proveedor intentar� comprobar la contrase�a.  Un fallo al verificar la contrase�a no provoca que el control se pase a los proveedores 
    subsiguientes.</p>

    <p>Los proveedores son implementados por <code class="module"><a href="../mod/mod_authn_dbm.html">mod_authn_dbm</a></code>,
    <code class="module"><a href="../mod/mod_authn_file.html">mod_authn_file</a></code>, <code class="module"><a href="../mod/mod_authn_dbd.html">mod_authn_dbd</a></code>,
    <code class="module"><a href="../mod/mod_authnz_ldap.html">mod_authnz_ldap</a></code> y <code class="module"><a href="../mod/mod_authn_socache.html">mod_authn_socache</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="authbasicusedigestalgorithm" id="authbasicusedigestalgorithm">Directiva</a> <a name="AuthBasicUseDigestAlgorithm" id="AuthBasicUseDigestAlgorithm">AuthBasicUseDigestAlgorithm</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Comprueba contrase�as en proveedores de autenticaci�n como si la Autenticaci�n Digest estuviera en uso en lugar de la Autenticaci�n B�sica.
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>AuthBasicUseDigestAlgorithm MD5|Off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>AuthBasicUseDigestAlgorithm Off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Base</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_auth_basic</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Apache HTTP Server 2.4.7 y posteriores</td></tr>
</table>
    <p>Normalmente, cuando se usa Autenticaci�n B�sica, los proveedores listados en
    <code class="directive"><a href="#authbasicprovider">AuthBasicProvider</a></code> intentan verificar un usuario comprobando sus almacenes de datos para encontrar una coincidencia de nombre de usuario y contrase�a asociados.  Las contrase�as almacenadas generalmente est�n encriptadas, pero no necesariamente; cada proveedor puede usar su propio esquema de almacenamiento para contrase�as.</p>

    <p>Cuando se usa 
    <code class="directive"><a href="../mod/mod_auth_digest.html#authdigestprovider">AuthDigestProvider</a></code> y Autenticaci�n Digest, los proveedores realizan una comprobaci�n similar para encontrar un nombre de usuario en sus almacenes de datos.  Sin embargo, al contrario que en el caso de la Autenticaci�n B�sica, el valor asociado con cada nombre de usuario almacenado debe ser una cadena de caracteres encriptada compuesta del nombre de usuario, nombre real y contrase�a.  (Vea el
    <a href="http://tools.ietf.org/html/rfc2617#section-3.2.2.2">
    RFC 2617, Secci�n 3.2.2.2</a> para m�s detalles en el formato usado para la cadena de caracteres encriptada.)</p>

    <p>Como consecuencia de la diferencia entre los valores almacenados entre la Autenticaci�n B�sica y la Digest, convertir desde Autenticaci�n Digest a Autenticaci�n B�sica generalmente requiere que a todos los usuarios se les asigne nuevas contrase�as, puesto que sus contrase�as actuales no pueden ser recuperadas desde el esquema de almacenamiento de contrase�as impuesto en esos proveedores que soportan la Autenticaci�n Digest.</p>

    <p>Configurando la directiva 
    <code class="directive"><a href="#authbasicusedigestalgorithm">AuthBasicUseDigestAlgorithm</a></code> a
    <code>MD5</code> har� que se compruebe la contrase�a del usuario de Autenticaci�n B�sica usando el mismo formato encriptado que para Autenticaci�n Digest.  Primero una cadena de caracteres que se compone del nombre de usuario, nombre real y contrase�a es encriptada con MD5; entonces el usuario y esta cadena de caracteres encriptada se pasan a los proveedores listados en 
    <code class="directive"><a href="#authbasicprovider">AuthBasicProvider</a></code> como si
    <code class="directive"><a href="../mod/mod_authn_core.html#authtype">AuthType</a></code> fuera configurado como
    <code>Digest</code> y como si se estuviera usando la Autenticaci�n Digest.
    </p>

    <p>A trav�s del uso de 
    <code class="directive"><a href="#authbasicusedigestalgorithm">AuthBasicUseDigestAlgorithm</a></code> un sitio puede pasar de Autenticaci�n Digest a B�sica sin requerir que a los usuarios se les asignen contrase�as nuevas.</p>

    <div class="note">
      El m�todo inverso de cambiar de Autenticaci�n B�sica a Digest sin asignar nuevas contrase�as generalmente no es posible.  Solo si las contrase�as de la Autenticaci�n B�sica se han almacenado en texto plano o con un esquema de encriptaci�n reversible ser�a posible recuperarlas y generar un nuevo almac�n de datos siguiendo el esquema de almacenamiento de contrase�as de Autenticaci�n Digest.
    </div>

    <div class="note">
      Solo proveedores que dan soporte a Autenticaci�n Digest podr�n autenticar usuarios cuando 
      <code class="directive"><a href="#authbasicusedigestalgorithm">AuthBasicUseDigestAlgorithm</a></code>
      est� configurada a <code>MD5</code>.  El uso de otros proveedores dar� como resultado una respuesta de error y se denegar� el acceso al cliente.
    </div>

</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_auth_basic.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_auth_basic.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_auth_basic.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_auth_basic.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a> |
<a href="../ko/mod/mod_auth_basic.html" hreflang="ko" rel="alternate" title="Korean">&nbsp;ko&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_auth_basic.html';
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