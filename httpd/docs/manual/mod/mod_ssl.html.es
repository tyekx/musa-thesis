<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_ssl - Servidor HTTP Apache Versi�n 2.5</title>
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
<div id="preamble"><h1>M�dulo Apache mod_ssl</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_ssl.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_ssl.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_ssl.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Criptograf�a fuerte usando una Capa de Sockets Seguros (Secure 
  Sockets Layer SSL) y protocolos de Seguridad de la Capa de Transporte 
  (Transport Layer Security TLS)</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>ssl_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_ssl.c</td></tr></table>
<h3>Resumen de contenidos</h3>

<p>Este m�dulo ofrece soporte para SSL v3 y TLS v1.x para el Servidor Apache
  HTTP. SSL v2 ya no est� soportado.</p>

<p>Este m�dulo depende de <a href="http://www.openssl.org/">OpenSSL</a> para
proveer el motor de criptograf�a.</p>

<p>Se facilitan m�s detalles, discusi�n y ejemplos en la 
<a href="../ssl/">documentaci�n SSL</a>.</p>
</div>
<div id="quickview"><h3>Temas</h3>
<ul id="topics">
<li><img alt="" src="../images/down.gif" /> <a href="#envvars">Variables de Entorno</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#logformats">Formatos de Log Personalizados</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#notes">Notas de Solicitud</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#expressionparser">Extensi�n Int�rprete de Expresiones</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#authzproviders">Proveedores de Autorizaci�n para su uso con
  Require</a></li>
</ul><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#sslcacertificatefile">SSLCACertificateFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcacertificatepath">SSLCACertificatePath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcadnrequestfile">SSLCADNRequestFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcadnrequestpath">SSLCADNRequestPath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcarevocationcheck">SSLCARevocationCheck</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcarevocationfile">SSLCARevocationFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcarevocationpath">SSLCARevocationPath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcertificatechainfile">SSLCertificateChainFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcertificatefile">SSLCertificateFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcertificatekeyfile">SSLCertificateKeyFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslciphersuite">SSLCipherSuite</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcompression">SSLCompression</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslcryptodevice">SSLCryptoDevice</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslengine">SSLEngine</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslfips">SSLFIPS</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslhonorcipherorder">SSLHonorCipherOrder</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslinsecurerenegotiation">SSLInsecureRenegotiation</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspdefaultresponder">SSLOCSPDefaultResponder</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspenable">SSLOCSPEnable</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspnoverify">SSLOCSPNoverify</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspoverrideresponder">SSLOCSPOverrideResponder</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspproxyurl">SSLOCSPProxyURL</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocsprespondercertificatefile">SSLOCSPResponderCertificateFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocsprespondertimeout">SSLOCSPResponderTimeout</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspresponsemaxage">SSLOCSPResponseMaxAge</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspresponsetimeskew">SSLOCSPResponseTimeSkew</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslocspuserequestnonce">SSLOCSPUseRequestNonce</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslopensslconfcmd">SSLOpenSSLConfCmd</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#ssloptions">SSLOptions</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslpassphrasedialog">SSLPassPhraseDialog</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslpolicy">SSLPolicy</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslpolicydefinesection">&lt;SSLPolicyDefine&gt;</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslprotocol">SSLProtocol</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycacertificatefile">SSLProxyCACertificateFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycacertificatepath">SSLProxyCACertificatePath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycarevocationcheck">SSLProxyCARevocationCheck</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycarevocationfile">SSLProxyCARevocationFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycarevocationpath">SSLProxyCARevocationPath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycheckpeercn">SSLProxyCheckPeerCN</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycheckpeerexpire">SSLProxyCheckPeerExpire</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxycheckpeername">SSLProxyCheckPeerName</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxyciphersuite">SSLProxyCipherSuite</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxyengine">SSLProxyEngine</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxymachinecertificatechainfile">SSLProxyMachineCertificateChainFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxymachinecertificatefile">SSLProxyMachineCertificateFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxymachinecertificatepath">SSLProxyMachineCertificatePath</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxypolicy">SSLProxyPolicy</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxyprotocol">SSLProxyProtocol</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxyverify">SSLProxyVerify</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslproxyverifydepth">SSLProxyVerifyDepth</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslrandomseed">SSLRandomSeed</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslrenegbuffersize">SSLRenegBufferSize</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslrequire">SSLRequire</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslrequiressl">SSLRequireSSL</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsessioncache">SSLSessionCache</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsessioncachetimeout">SSLSessionCacheTimeout</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsessionticketkeyfile">SSLSessionTicketKeyFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsessiontickets">SSLSessionTickets</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsrpunknownuserseed">SSLSRPUnknownUserSeed</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslsrpverifierfile">SSLSRPVerifierFile</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingcache">SSLStaplingCache</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingerrorcachetimeout">SSLStaplingErrorCacheTimeout</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingfaketrylater">SSLStaplingFakeTryLater</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingforceurl">SSLStaplingForceURL</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingrespondertimeout">SSLStaplingResponderTimeout</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingresponsemaxage">SSLStaplingResponseMaxAge</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingresponsetimeskew">SSLStaplingResponseTimeSkew</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingreturnrespondererrors">SSLStaplingReturnResponderErrors</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstaplingstandardcachetimeout">SSLStaplingStandardCacheTimeout</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslstrictsnivhostcheck">SSLStrictSNIVHostCheck</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslusername">SSLUserName</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslusestapling">SSLUseStapling</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslverifyclient">SSLVerifyClient</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#sslverifydepth">SSLVerifyDepth</a></li>
</ul>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_ssl">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_ssl">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><a href="#comments_section">Comentarios</a></li></ul></div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="envvars" id="envvars">Variables de Entorno</a></h2>

<p>Este m�dulo puede ser configurado para proveer muchos elementos de informaci�n
SSL como variables de entorno adicionales para el espacio de nombres de SSI y 
CGI. Esta informaci�n no se facilita por defecto por razones de rendimiento. 
(Vea StdEnvVars de <code class="directive">SSLOptions</code> m�s adelante.) Las 
variables generadas se listan en la tabla a continuaci�n. Para 
retrocompatibilidad la informaci�n tambi�n puede estar disponible bajo distintos 
nombres. Vea el cap�tulo <a href="../ssl/ssl_compat.html">Compatibilidad</a> 
para m�s detalles sobre las variables de compatibilidad.</p>

<table class="bordered">

<tr>
 <th><a name="table3">Nommbre de Variable:</a></th>
 <th>Valor Tipo:</th>
 <th>Descripci�n:</th>
</tr>
<tr><td><code>HTTPS</code></td>                         <td>flag</td>      <td>Se est� usando HTTPS.</td></tr>
<tr><td><code>SSL_PROTOCOL</code></td>                  <td>string</td>    <td>El protocolo SSL versi�n (SSLv3, TLSv1, TLSv1.1, TLSv1.2)</td></tr>
<tr><td><code>SSL_SESSION_ID</code></td>                <td>string</td>    <td>El id de sesi�n SSL codificado en hexadecimal</td></tr>
<tr><td><code>SSL_SESSION_RESUMED</code></td>           <td>string</td>    <td>Ses��n SSL inicial o reanudada.  Nota: multiples peticiones pueden servirse a trav�s de la misma sesi�n SSL (Inicial o Reanudada) si el KeepAlive de HTTP est� en uso</td></tr>
<tr><td><code>SSL_SECURE_RENEG</code></td>              <td>string</td>    <td><code>true</code> si la renegociaci�n segura est� soportada, si no <code>false</code></td></tr>
<tr><td><code>SSL_CIPHER</code></td>                    <td>string</td>    <td>El nombre de la especificaci�n del cifrado</td></tr>
<tr><td><code>SSL_CIPHER_EXPORT</code></td>             <td>string</td>    <td><code>true</code> si el cifrado es un cifrado export</td></tr>
<tr><td><code>SSL_CIPHER_USEKEYSIZE</code></td>         <td>number</td>    <td>N�mero de bits de cifrado (en uso actualmente)</td></tr>
<tr><td><code>SSL_CIPHER_ALGKEYSIZE</code></td>         <td>number</td>    <td>N�mero de bits de cifrado (posibles)</td></tr>
<tr><td><code>SSL_COMPRESS_METHOD</code></td>           <td>string</td>    <td>M�todo de compresi�n SSL negociado</td></tr>
<tr><td><code>SSL_VERSION_INTERFACE</code></td>         <td>string</td>    <td>La versi�n de mod_ssl</td></tr>
<tr><td><code>SSL_VERSION_LIBRARY</code></td>           <td>string</td>    <td>La versi�n del programa OpenSSL</td></tr>
<tr><td><code>SSL_CLIENT_M_VERSION</code></td>          <td>string</td>    <td>La versi�n del certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_M_SERIAL</code></td>           <td>string</td>    <td>El serial del certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_S_DN</code></td>               <td>string</td>    <td>Sujeto DN en el certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_S_DN_</code><em>x509</em></td> <td>string</td>    <td>Componente del Sujeto DN cliente</td></tr>
<tr><td><code>SSL_CLIENT_SAN_Email_</code><em>n</em></td> <td>string</td>  <td>Entradas de extensi�n subjectAltName del certificado cliente del tipo rfc822Name</td></tr>
<tr><td><code>SSL_CLIENT_SAN_DNS_</code><em>n</em></td> <td>string</td>    <td>Entradas de extensi�n subjectAltName del tipo dNSName</td></tr>
<tr><td><code>SSL_CLIENT_SAN_OTHER_msUPN_</code><em>n</em></td> <td>string</td>    <td>Entradas de extensi�n subjectAltName del certificado cliente del tipo otherName, Microsoft User Principal Name form (OID 1.3.6.1.4.1.311.20.2.3)</td></tr>
<tr><td><code>SSL_CLIENT_I_DN</code></td>               <td>string</td>    <td>DN del firmante en el certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_I_DN_</code><em>x509</em></td> <td>string</td>    <td>Componente del DN en el firmante del certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_V_START</code></td>            <td>string</td>    <td>Validez del certificado cliente (fecha de inicio)</td></tr>
<tr><td><code>SSL_CLIENT_V_END</code></td>              <td>string</td>    <td>Validez del certificado cliente (fecha fin)</td></tr>
<tr><td><code>SSL_CLIENT_V_REMAIN</code></td>           <td>string</td>    <td>N�mero de d�as hasta que el certificado cliente expira</td></tr>
<tr><td><code>SSL_CLIENT_A_SIG</code></td>              <td>string</td>    <td>Algoritmo usado para la firma del certificado cliente</td></tr>
<tr><td><code>SSL_CLIENT_A_KEY</code></td>              <td>string</td>    <td>Algoritmo usado para la clave p�blica del certificado cliente.</td></tr>
<tr><td><code>SSL_CLIENT_CERT</code></td>               <td>string</td>    <td>Certificado cliente condificado en PEM</td></tr>
<tr><td><code>SSL_CLIENT_CERT_CHAIN_</code><em>n</em></td> <td>string</td>    <td>Certificados codificados en PEM en la cadena de certificados cliente</td></tr>
<tr><td><code>SSL_CLIENT_CERT_RFC4523_CEA</code></td>   <td>string</td>    <td>N�mero de serie y distribuidor del certificado. El formato coincide con el CertificateExactAssertion en RFC4523</td></tr>
<tr><td><code>SSL_CLIENT_VERIFY</code></td>             <td>string</td>    <td><code>NONE</code>, <code>SUCCESS</code>, <code>GENEROUS</code> or <code>FAILED:</code><em>reason</em></td></tr>
<tr><td><code>SSL_SERVER_M_VERSION</code></td>          <td>string</td>    <td>La versi�n del certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_M_SERIAL</code></td>           <td>string</td>    <td>El serial del certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_S_DN</code></td>               <td>string</td>    <td>Nombre DN en el certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_SAN_Email_</code><em>n</em></td> <td>string</td>  <td>Entradas de extensi�n subjectAltName en el certificado del servidor del tipo rfc822Name</td></tr>
<tr><td><code>SSL_SERVER_SAN_DNS_</code><em>n</em></td> <td>string</td>    <td>Entradas de Extensi�n subjectAltName del tipo Server dNSName del certificado del Servidor</td></tr>
<tr><td><code>SSL_SERVER_SAN_OTHER_dnsSRV_</code><em>n</em></td> <td>string</td>    <td>Entradas de extensi�n subjectAltName del tipo otherName, forma SRVName (OID 1.3.6.1.5.5.7.8.7, RFC 4985) del certificado del servidor.</td></tr>
<tr><td><code>SSL_SERVER_S_DN_</code><em>x509</em></td> <td>string</td>    <td>Componente del Sujeto DN del servidor</td></tr>
<tr><td><code>SSL_SERVER_I_DN</code></td>               <td>string</td>    <td>DN del Firmante del certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_I_DN_</code><em>x509</em></td> <td>string</td>    <td>Componente en el DN del firmante del servidor</td></tr>
<tr><td><code>SSL_SERVER_V_START</code></td>            <td>string</td>    <td>Validez del certificado del servidor (fecha de inicio)</td></tr>
<tr><td><code>SSL_SERVER_V_END</code></td>              <td>string</td>    <td>Validez del certificado del servidor (fecha de fin)</td></tr>
<tr><td><code>SSL_SERVER_A_SIG</code></td>              <td>string</td>    <td>Algoritmo utilizado para la firma del certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_A_KEY</code></td>              <td>string</td>    <td>Algoritmo utilizado para la clave p�blica del certificado del servidor</td></tr>
<tr><td><code>SSL_SERVER_CERT</code></td>               <td>string</td>    <td>Certificado del servidor codificado en PEM</td></tr>
<tr><td><code>SSL_SRP_USER</code></td>                  <td>string</td>    <td>Nombre de usuario SRP</td></tr>
<tr><td><code>SSL_SRP_USERINFO</code></td>              <td>string</td>    <td>Informaci�n de usuario SRP</td></tr>
<tr><td><code>SSL_TLS_SNI</code></td>                   <td>string</td>    <td>Contenido de la extensi�n TLS SNI (si se provee en el ClientHello)</td></tr>
</table>

<p><em>x509</em> especifica un componente de un DN X.509; uno entre
<code>C,ST,L,O,OU,CN,T,I,G,S,D,UID,Email</code>.  En Apache 2.2.0 en
posterior, <em>x509</em> tambi�n puede incluir un sufijo <code>_n</code>
num�rico. Si el DN en cuesti�n contiene m�ltiples atributos del mismo
nombre, este sufijo se usa para un �ndice basado en ceros para seleccionar
un atributo en particular.  Por ejemplo, donde el sujeto del DN del 
certificado del servidor incluia dos atributos OU,
 <code>SSL_SERVER_S_DN_OU_0</code> y
<code>SSL_SERVER_S_DN_OU_1</code> podr�a usarse para referenciar cada una. 
Una variable sin un sufijo <code>_n</code> es equivalente a ese nombre con un
sufijo <code>_0</code>; el primer (y �nico) atributo.
Cuando la tabla del entorno se llena usando la opci�n <code>StdEnvVars</code> 
de la directiva <code class="directive"><a href="#ssloptions">SSLOptions</a></code>, el primer
(o �nico) atributo de cualquier DN se a�ade s�lo bajo un nombre sin sufijo; 
p. ej. no se a�aden entradas con sufijo <code>_0</code>.</p>

<p>En httpd 2.5.0 y posterior, se puede a�adir un sufijo <em>_RAW</em> a
<em>x509</em> en un componente DN para suprimir la conversi�n del valor
del atributo a UTF-8. Esto se debe colocar despu�s del sufijo de indice (si lo 
hay). Por ejemplo, se podr�a usar <code>SSL_SERVER_S_DN_OU_RAW</code> o
<code>SSL_SERVER_S_DN_OU_0_RAW</code>.</p>

<p>El formato de las variables <em>*_DN</em> ha cambiado en Apache HTTPD
2.3.11. Vea la opci�n <code>LegacyDNStringFormat</code> para
<code class="directive"><a href="#ssloptions">SSLOptions</a></code> para m�s detalles.</p>

<p><code>SSL_CLIENT_V_REMAIN</code> s�lo est� disponible en la versi�n 2.1 y
posterior.</p>

<p>Se puede usar varias variables de entorno adicionales con expresiones en
<code class="directive">SSLRequire</code>, o en formatos de log personalizados:</p>

<div class="note"><pre>HTTP_USER_AGENT        PATH_INFO             AUTH_TYPE
HTTP_REFERER           QUERY_STRING          SERVER_SOFTWARE
HTTP_COOKIE            REMOTE_HOST           API_VERSION
HTTP_FORWARDED         REMOTE_IDENT          TIME_YEAR
HTTP_HOST              IS_SUBREQ             TIME_MON
HTTP_PROXY_CONNECTION  DOCUMENT_ROOT         TIME_DAY
HTTP_ACCEPT            SERVER_ADMIN          TIME_HOUR
THE_REQUEST            SERVER_NAME           TIME_MIN
REQUEST_FILENAME       SERVER_PORT           TIME_SEC
REQUEST_METHOD         SERVER_PROTOCOL       TIME_WDAY
REQUEST_SCHEME         REMOTE_ADDR           TIME
REQUEST_URI            REMOTE_USER</pre></div>

<p>En estos contextos, tambi�n se pueden usar dos formatos especiales:</p>

<dl>
  <dt><code>ENV:<em>nombredevariable</em></code></dt>
  <dd>Esto se rellenar� al valor de la variable de entorno est�ndar 
    <em>nombredevariable</em>.</dd>

  <dt><code>HTTP:<em>nombredecabecera</em></code></dt>
  <dd>Esto se rellenar� con el valor de la cabecera de solicitud con el nombre
  <em>nombredecabecera</em>.</dd>
</dl>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="logformats" id="logformats">Formatos de Log Personalizados</a></h2>

<p>Cuando se compila <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> en Apache o al menos se carga (en
situaci�n de DSO) existen funciones adicionales para el
<a href="mod_log_config.html#formats">Formatos de Log Personalizados</a> de
<code class="module"><a href="../mod/mod_log_config.html">mod_log_config</a></code>. Primero hay una funci�n de extensi�n de formato 
adicional ``<code>%{</code><em>varname</em><code>}x</code>'' que puede usarse
para extender cualquier variable facilitada por cualquier m�dulo, especialmente 
aquellas que son facilitadas por mod_ssl que puede encontrar en la tabla de m�s
arriba.</p>
<p>

Para retro compatibilidad adicionalmente se facilita  una funci�n de formato de 
criptograf�a ``<code>%{</code><em>nombre</em><code>}c</code>''. Informaci�n sobre
esta funci�n se facilita en cap�tulo de <a href="../ssl/ssl_compat.html">Compatibilidad</a>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">CustomLog "logs/ssl_request_log" "%t %h %{SSL_PROTOCOL}x %{SSL_CIPHER}x \"%r\" %b"</pre>
</div>
<p>Estos formatos incluso funcionan sin la opci�n de configuraci�n
<code>StdEnvVars</code> de la directiva 
<code class="directive"><a href="#ssloptions">SSLOptions</a></code>.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="notes" id="notes">Notas de Solicitud</a></h2>

<p><code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> configura "notas" para la petici�n que pueden 
usarse en el registro de logs con la cadena de caracteres 
<code>%{<em>nombre</em>}n</code> en <code class="module"><a href="../mod/mod_log_config.html">mod_log_config</a></code>.</p>

<p>A continuaci�n se indican las notas soportadas:</p>

<dl>
  <dt><code>ssl-access-forbidden</code></dt>
  <dd>Esta nota se configura al valor <code>1</code> si el acceso fue
  denegado debido a una directiva <code class="directive">SSLRequire</code> o
  <code class="directive">SSLRequireSSL</code>.</dd>

  <dt><code>ssl-secure-reneg</code></dt>
  <dd>Si se compila <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> con una versi�n de OpenSSL que 
  soporta la extensi�n de renegociaci�n segura, esta nota se configura con el 
  valor <code>1</code> si se usa SSL para la conexi�n actual y el cliente
  tambi�n soporta la extensi�n de renegociaci�n segura.  Si el cliente no 
  soporta la extensi�n de renegociaci�n segura, esta nota se configura con el valor
  <code>0</code>.
  Si se compila <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> con una versi�n de OpenSSL que no
  soporta renegociaci�n segura, o si SSL no se usa en la conexi�n actual, esta
  nota no se configura.</dd>
</dl>

</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="expressionparser" id="expressionparser">Extensi�n Int�rprete de Expresiones</a></h2>
  

<p>Cuando se compila <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> en Apache o se carga 
(bajo situaci�n DSO) cualquier <a name="envvars">variable</a>
facilitada por <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> puede usarse en expresiones para el
 <a href="../expr.html">Int�rprete de Expresiones ap_expr</a>.
Se puede hacer referencia a las variables usando la sintaxis
``<code>%{</code><em>varname</em><code>}</code>''. Comenzando con la versi�n
2.4.18 uno tambi�n puede usar el estilo de sintaxis de
<code class="module"><a href="../mod/mod_rewrite.html">mod_rewrite</a></code> 
``<code>%{SSL:</code><em>nombredevariable</em><code>}</code>'' o el estilo de 
sintaxis de la funci�n 
``<code>ssl(</code><em>nombredevariable</em><code>)</code>''.</p>

<div class="example"><h3>Ejemplo (usando <code class="module"><a href="../mod/mod_headers.html">mod_headers</a></code>)</h3><pre class="prettyprint lang-config">Header set X-SSL-PROTOCOL "expr=%{SSL_PROTOCOL}"
Header set X-SSL-CIPHER "expr=%{SSL:SSL_CIPHER}"</pre>
</div>

<p>Esta caracter�stica funciona incluso sin configurar la opci�n
 <code>StdEnvVars</code> de la directiva 
 <code class="directive"><a href="#ssloptions">SSLOptions</a></code>.</p>
</div><div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="section">
<h2><a name="authzproviders" id="authzproviders">Proveedores de Autorizaci�n para su uso con
  Require</a></h2>
  <p><code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> facilita unos pocos proveedores de autenticaci�n
  para usarse con la directiva <code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code>
  de <code class="module"><a href="../mod/mod_authz_core.html">mod_authz_core</a></code>.</p>

  <h3><a name="reqssl" id="reqssl">Require ssl</a></h3>
    <p>El proveedor de <code>ssl</code> deniega el acceso si la conexi�n no est�
    encriptada con SSL. Esto es similar a la directiva 
    <code class="directive">SSLRequireSSL</code>.</p>
    <pre class="prettyprint lang-config">Require ssl</pre>

  

  <h3><a name="reqverifyclient" id="reqverifyclient">Require ssl-verify-client</a></h3>
    <p>El proveedor de <code>ssl</code> permite acceso si el usuario se autentica
    con un certificado cliente v�lido. Esto s�lo es �til si se est� usando
    <code>SSLVerifyClient optional</code>.</p>

    <p>El siguiente ejemplo permite acceso si el usuario se autentica o bien
      con certificado cliente o con usuario y contrase�a.</p>
    <pre class="prettyprint lang-config">Require ssl-verify-client
Require valid-user</pre>


  

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcacertificatefile" id="sslcacertificatefile">Directiva</a> <a name="SSLCACertificateFile" id="SSLCACertificateFile">SSLCACertificateFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de Certificados CA concatenados y codificados en PEM para
la Autenticaci�n de Cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCACertificateFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero <em>todo-en-uno</em> donde puede ensamblar
los Certificados de las Autoridades de Certificaci�n (CA) de los 
<em>clientes</em> que acceden a su servidor. Esto se usan para la Autenticaci�n
de Cliente. Tal fichero es sencillamente la concatenaci�n, en orden de preferencia,
de varios ficheros de Certificado codificados en PEM. Esto puede usarse
alternativamente y/o adicionalmente a 
<code class="directive"><a href="#sslcacertificatepath">SSLCACertificatePath</a></code>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCACertificateFile "/usr/local/apache2/conf/ssl.crt/ca-bundle-client.crt"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcacertificatepath" id="sslcacertificatepath">Directiva</a> <a name="SSLCACertificatePath" id="SSLCACertificatePath">SSLCACertificatePath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de certificados CA codificados en PEM para la 
autenticaci�n de Cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCACertificatePath <em>ruta-de-directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el directorio donde guarda los certificados de 
Autoridades de Certificaci�n (CAs) de los clientes que acceder�n a su servidor. 
Esto se usar�n para verificar el certificado cliente en la Autenticaci�n de
Cliente.</p>

<p>
Los ficheros en este directorio tienen que ser codificados en PEM y se acceden a
trav�s de nombres de ficheros con hash. As� que generalmente no puede poner 
simplemente los ficheros ah�: tambi�n tiene que crear enlaces simb�licos con 
nombre <em>valor-hash</em><code>.N</code>. Y siempre deber�a asegurarse de que
este directorio contiene los enlaces simb�licos apropiados.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCACertificatePath "/usr/local/apache2/conf/ssl.crt/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcadnrequestfile" id="sslcadnrequestfile">Directiva</a> <a name="SSLCADNRequestFile" id="SSLCADNRequestFile">SSLCADNRequestFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de certificados CA concatenados codificados en PEM para
  definir nombres de CA aceptables</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCADNRequestFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Cuando se solicita un certificado cliente por mod_ssl, una lista de 
<em>nombres de Autoridad Certificadora aceptables</em> se env�a al cliente en
el saludo SSL. Estos nombres de CA se pueden usar por el cliente para 
seleccionar un certificado cliente apropiado entre los que tiene disponibles.</p>

<p>Si no est�n las directivas <code class="directive"><a href="#sslcadnrequestpath">SSLCADNRequestPath</a></code> o 
<code class="directive"><a href="#sslcadnrequestfile">SSLCADNRequestFile</a></code>, entonces el 
conjunto de nombres aceptables de CA enviados al cliente es la de los nombres
de todos los certificados de CA cargados en las directivas
<code class="directive"><a href="#sslcacertificatefile">SSLCACertificateFile</a></code> y 
<code class="directive"><a href="#sslcacertificatepath">SSLCACertificatePath</a></code>; en otras palabras,
los nombres de las CAs que se usar�n actualmente para verificar el certificado
cliente.</p>

<p>En algunas circunstancias, es �til poder enviar un conjunto de nombres de CA
aceptables diferente de las CAs usadas para verificar el certificado cliente - 
por ejemplo, si los certificados cliente est�n firmados CAs intermedias. En tales
casos, <code class="directive"><a href="#sslcadnrequestpath">SSLCADNRequestPath</a></code> y/o 
<code class="directive"><a href="#sslcadnrequestfile">SSLCADNRequestFile</a></code> se pueden usar; los
nombres de CA aceptables se toman del conjunto completo de certificados en el 
directorio y/o fichero especificados por este par de directivas.</p>

<p><code class="directive"><a href="#sslcadnrequestfile">SSLCADNRequestFile</a></code> debe especificar
un fichero <em>todo-en-uno</em> que contenga una concatenaci�n de certificados
CA codificados en PEM.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCADNRequestFile "/usr/local/apache2/conf/ca-names.crt"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcadnrequestpath" id="sslcadnrequestpath">Directiva</a> <a name="SSLCADNRequestPath" id="SSLCADNRequestPath">SSLCADNRequestPath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de Certificados CA codificados en PEM para definir
nombres de CA aceptables</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCADNRequestPath <em>ruta-al-directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>

<p>Esta directiva opcional puede usarse para especificar un conjunto de
<em>nombres de CA aceptables</em> que ser�n enviados al cliente cuando se 
solicita un certificado cliente. Vea la directiva 
<code class="directive"><a href="#sslcadnrequestfile">SSLCADNRequestFile</a></code> para m�s 
detalles.</p>

<p>Los ficheros en este directorio tienen que estar codificados en PEM y se
accede a ellos con nombres de ficheros con hash. As� que generalmente no puede
poner sin m�s los ficheros de Certificado ah�: tambi�n tiene que crear enlaces
simb�licos llamados <em>valor-de-hash</em><code>.N</code>. Y siempre deber�a
estar seguro de que este directorio contiene los enlaces simb�licos 
apropiados.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCADNRequestPath "/usr/local/apache2/conf/ca-names.crt/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcarevocationcheck" id="sslcarevocationcheck">Directiva</a> <a name="SSLCARevocationCheck" id="SSLCARevocationCheck">SSLCARevocationCheck</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activar comprobaci�n de revocaci�n basada en CRL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCARevocationCheck chain|leaf|none <em>modificador</em>es</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLCARevocationCheck none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td><em>Modificador</em>es Opcionales disponibles en httpd 2.4.21 o 
posterior</td></tr>
</table>
<p>
Activa la comprobaci�n de la lista de revocaci�n de certificados (CRL). Al menos
<code class="directive"><a href="#sslcarevocationfile">SSLCARevocationFile</a></code>
o <code class="directive"><a href="#sslcarevocationpath">SSLCARevocationPath</a></code> deben estar 
configuradas. Cuando se configuran a <code>chain</code> (configuraci�n 
recomendada), las comprobaciones de CRL se aplican a todos los certificados
en la cadena, mientras que si se configura a <code>leaf</code> limita las
comprobaciones al certificado firmado final.
</p>

<p>Los <em>modificador</em>es disponibles son:</p>
<ul>
<li><code>no_crl_for_cert_ok</code>
    <p>
    Previamente a la versi�n 2.3.15, la comprobaci�n de CRL en mod_ssl tambi�n
    ten�a �xito cuando no se encontraban CRL/s para los certificados comprobados
    en ninguna de las ubicaciones configuradas con 
    <code class="directive"><a href="#sslcarevocationfile">SSLCARevocationFile</a></code>
    o <code class="directive"><a href="#sslcarevocationpath">SSLCARevocationPath</a></code>.
    </p>

    <p>
    Con la introducci�n de <code class="directive">SSLCARevocationFile</code>,
    el comportamiento ha cambiado: por defecto con <code>chain</code> o
    <code>leaf</code>, los CRLs <strong>deben</strong> estar presentes
    para que la validaci�n tenga �xito, si no fallar� con un error
    <code>"unable to get certificate CRL"</code>.
    </p>

    <p>
    El <em>modificador</em> <code>no_crl_for_cert_ok</code> permite 
    restaurar el comportamiento anterior..
    </p>
</li>
</ul>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCARevocationCheck chain</pre>
</div>
<div class="example"><h3>Compatibilidad con versiones 2.2</h3><pre class="prettyprint lang-config">SSLCARevocationCheck chain no_crl_for_cert_ok</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcarevocationfile" id="sslcarevocationfile">Directiva</a> <a name="SSLCARevocationFile" id="SSLCARevocationFile">SSLCARevocationFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de CRL's de CA concatenados y codificados en PEM para la
  Autenticaci�n de ClienteFile of concatenated PEM-encoded CA CRLs for
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCARevocationFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero <em>todo-en-uno</em> donde puede ensamblar
las Listas de Revocaci�n de Certificados (CRL) de las Autoridades de
Certificaci�n (CA) para los <em>clientes</em> que conectan a su servidor. Estos
se usan para la Autenticaci�n de Cliente. Tal fichero es simplemente la 
concatenaci�n de varios ficheros CRL codificados en PEM, en orden de 
preferencia. Esto se puede usar alternativamente a/o adicionalmente a 
<code class="directive"><a href="#sslcarevocationpath">SSLCARevocationPath</a></code>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCARevocationFile "/usr/local/apache2/conf/ssl.crl/ca-bundle-client.crl"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcarevocationpath" id="sslcarevocationpath">Directiva</a> <a name="SSLCARevocationPath" id="SSLCARevocationPath">SSLCARevocationPath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de CRLs de CA codificados en PEM para la Autenticaci�n
de Cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCARevocationPath <em>ruta-al-directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el directorio donde usted alojar� las Listas de
Revocaci�n de Certificados (CRL) de las Autoridades de Certificaci�n (CAs) para
los clientes que conectan al servidor. Estas se usan para revocar el 
certificado cliente en la Autenticaci�n de Cliente.</p>

<p>
Los ficheros en este directorio tienen que ser codificados en PEM y se accede a
ellos con nombres de ficheros con hash. As� que generalmente no s�lo tiene que
poner los ficheros CRL ah�. Adicionalmente tiene que crear enlaces simb�licos
llamados <em>valor-de-hash</em><code>.rN</code>. Y deber�a asegurarse siempre 
que este directorio contiene los enlaces simb�licos apropiados.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCARevocationPath "/usr/local/apache2/conf/ssl.crl/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcertificatechainfile" id="sslcertificatechainfile">Directiva</a> <a name="SSLCertificateChainFile" id="SSLCertificateChainFile">SSLCertificateChainFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de Certificados CA de Servidor codificado en 
  PEM</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCertificateChainFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<div class="note"><h3>SSLCertificateChainFile est� obsoleto</h3>
<p><code>SSLCertificateChainFile</code> qued� obsoleto con la versi�n 2.4.8, 
cuando se extendi� <code class="directive"><a href="#sslcertificatefile">SSLCertificateFile</a></code>
para cargar tambi�n los certificados de CA intermedias del fichero de 
certificados del servidor.</p>
</div>

<p>
Esta directiva configura el fichero <em>todo-en-uno</em> donde puede ensamblar los
certificados de Autoridades de Certificaci�n (CA - Certification Authorities) 
que forman la cadena del certificado del servidor. Este comienza con el 
certificado de la CA firmante del certificado del servidor y puede ir hasta el
certificado de la CA ra�z. Tal fichero es simplemente la concatenaci�n de varios
ficheros de Certificado CA codificado en PEM, generalmente siguiendo la cadena
de certificaci�n.</p>

<p>
Esto deber�a usarse alternativamente y/o adicionalmente a 
<code class="directive"><a href="#sslcacertificatepath">SSLCACertificatePath</a></code> para construir
explicitamente la cadena de CA del certificado del servidor que se env�a al 
navegador adem�s del certificado del servidor. Es especialmente �ltil
para evitar conflictos con certificados CA cuando se usa autenticaci�n de 
cliente. Porque aunque colocar los CA de la cadena de certificados del servidor
en  <code class="directive"><a href="#sslcacertificatepath">SSLCACertificatePath</a></code> tiene el mismo
efecto para la construcci�n de la cadena de certificados, tiene un efecto 
adicional en la que los certificados cliente firmados por el mismo certificado CA
tambi�n se aceptan en la autenticaci�n de cliente.</p>

<p>
Pero tenga cuidado: Proveer la cadena de certificados funciona s�lo si est�
usando <em>un s�lo</em> certificado de servidor basado en RSA <em>o</em> DSA. Si
est� usando un par de certificados juntos RSA+DSA, esto s�lo funcionar� si
ambos certificados usan <em>la misma</em> cadena de certificados. Si no los 
navegadores se confundir�n en esta situaci�n.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCertificateChainFile "/usr/local/apache2/conf/ssl.crt/ca.crt"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcertificatefile" id="sslcertificatefile">Directiva</a> <a name="SSLCertificateFile" id="SSLCertificateFile">SSLCertificateFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de datos Certificado X.509 codificado en PEM</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCertificateFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva apunta a un fichero con datos de certificado en formato PEM. Como
m�nimo, el fichero debe incluir un certificado final (no s�lo CA a menos que sea
autofirmado). La directiva puede usarse multiples veces (haciendo referencia a
ficheros distintos) para dar soporte a m�ltiples algoritmos para la 
autenticaci�n de servidor - t�picamente RSA, DSA y ECC. El n�mero de algoritmos
soportados depende de la versi�n de OpenSSL utilizada por mod_ssl: con la versi�n
1.0.0 o posterior,
<code>openssl list-public-key-algorithms</code> sacar� una lista de algoritmos
soportados, vea tambi�n la nota m�s adelante sobre limitaciones de versiones
OpenSSL previas a 1.0.2 y la forma de sortearlas.
</p>

<p>
Los ficheros pueden tambi�n incluir certificados de CA intermedias, ordenados 
desde el certificado firmado hasta el certificado ra�z. Esto est� soportado con 
la versi�n 2.4.8 y posterior, y deja obsoleta la directiva 
<code class="directive"><a href="#sslcertificatechainfile">SSLCertificateChainFile</a></code>.
Cuando se trabaja con OpenSSL 1.0.2 o posterior, esto permite que se configuren
la cadena de CAs intermedias por certificado.
</p>

<p>
Tambi�n se pueden a�adir par�metros personalizados DH y un nombre de curva EC 
para claves ef�meras al final del primer fichero configurado usando 
<code class="directive"><a href="#sslcertificatefile">SSLCertificateFile</a></code>.
Esto est� soportado en la versi�n 2.4.7 y posterior.

Tales par�metros pueden ser generados usando los comandos
<code>openssl dhparam</code> y <code>openssl ecparam</code>. Los par�metros se 
pueden a�adir tal cual al final del primer fichero de certificado. s�lo se puede
usar el primer fichero para los par�metros personalizados, puesto que estos
se aplican independientemente del tipo de algoritmo de autenticaci�n.
</p>

<p>
Finalmente la clave privada del certificado tambi�n se puede a�adir al fichero
de certificado en lugar de usar por separado la directiva 
<code class="directive"><a href="#sslcertificatekeyfile">SSLCertificateKeyFile</a></code>. Esta pr�ctica
est� muy desaconsejada. Si se usa, los ficheros de certificado usando tales
ficheros de claves embebidas deben configurarse despu�s de los certificados que
usan una clave privada en un fichero aparte. Si la clave privada est� encriptada
, el di�logo de solicitud de contrase�a se fuerza en el arranque.
</p>

<div class="note">
<h3>Interoperabilidad de par�metro DH con primos &gt; 1024 bits</h3>
<p>
Comenzando con la versi�n 2.4.7, mod_ssl hace uso de par�metros DH 
estandarizados con longitud de primos de 2048, 3072 y 4096 bits y con longitud 
adicional de primos de 6144 y 8192 bits comenzando con la versi�n 2.4.10
(from <a href="http://www.ietf.org/rfc/rfc3526.txt">RFC 3526</a>), y los
env�a a clientes bas�ndose en la longitud de la clave RSA/DSA del certificado.
Con clientes basados en Java en particular (Java 7 o anterior), esto puede
llevar a fallos de saludo inicial SSL - vea esta
<a href="../ssl/ssl_faq.html#javadh">respuesta de FAQ </a> para sortear estos
problemas.
</p>
</div>

<div class="note">
<h3>Par�metros DH por defecto cuando se usan multiples certificados y 
y versiones de OpenSSL anteriores a 1.0.2</h3>
<p>
Cuando se usan m�ltiples certificados para dar soporte a algoritmos de 
autenticaci�n diferentes (como RSA, DSA pero principalmente ECC) y OpenSSL 
anterior a 1.0.2, se recomienda usar o bien par�metros DH personalizados 
(preferiblemente) a�adi�ndolos al primer fichero de certificado (como se 
describe m�s arriba), o ordenar las directivas
<code class="directive">SSLCertificateFile</code> para que los certificados RSA/DSA
est�n colocadas <strong>despu�s</strong> del ECC.
</p>

<p>
Esto se debe a una limitaci�n en versiones m�s antiguas de OpenSSL que no 
permiten que el servidor HTTP Apache determine el certificado seleccionado
actualmente en el momento del saludo SSL (cuando se deben mandar los par�metros
DH al cliente) pero en su lugar siempre se provee el �ltimo certificado 
configurado. Consecuentemente, el servidor puede seleccionar par�metros DH
por defecto basado en la longitud de la clave privada incorrecta (las clacves 
ECC son mucho m�s peque�as que las RSA/DSA y su longitud no es relevante para
seleccionar primos DH).
</p>

<p>
Puesto que los par�metros personalizados DH siempre tienen precedencia sobre
los de por defecto, este problema se puede evitar creando y configur�ndolos 
(como se describe arriba), y as� usar una longitud adecuada/personalizada.
</p>
</div>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCertificateFile "/usr/local/apache2/conf/ssl.crt/server.crt"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcertificatekeyfile" id="sslcertificatekeyfile">Directiva</a> <a name="SSLCertificateKeyFile" id="SSLCertificateKeyFile">SSLCertificateKeyFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de clave privada de Servidor codificada en PEM</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCertificateKeyFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva apunta al fichero de clave privada codificado en PEM para el 
servidor. Si la clave privada contenida en el fichero est� encriptada, se 
forzar� un di�logo de solicitud de contrase�a en el arranque.</p>

<p>
La directiva puede usarse m�ltiples veces (haciendo referencia a ficheros 
distintos) para dar soporte a m�ltiples algoritmos de autenticaci�n para el 
servidor. Por cada directiva
<code class="directive"><a href="#sslcertificatekeyfile">SSLCertificateKeyFile</a></code>
directive, debe haber una directiva <code class="directive">SSLCertificateFile</code>
relacionada.</p>

<p>
La clave privada se puede combinar con el certificado en el fichero indicado en
<code class="directive"><a href="#sslcertificatefile">SSLCertificateFile</a></code>, pero esta pr�ctica
es muy desaconsejable. Si se usa, los ficheros de certificado con la clave
privada dentro deben configurarse despu�s de los certificados que tienen una
clave privada en otro fichero.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCertificateKeyFile "/usr/local/apache2/conf/ssl.key/server.key"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslciphersuite" id="sslciphersuite">Directiva</a> <a name="SSLCipherSuite" id="SSLCipherSuite">SSLCipherSuite</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Conjunto de Cifrados disponibles para negociaci�n en el saludo SSL
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCipherSuite <em>especificaci�n-de-cifrado</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLCipherSuite DEFAULT (depende de la versi�n de OpenSSL)</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta compleja directiva usa una cadena de <em>cifrados</em> separados por comas
que consiste en especificaciones de cifrado OpenSSL para configurar el conjunto
de cifrados que se le permite negociar al cliente en la fase de saludo SSL. 
Tenga en cuenta que esta directiva se puede usar en contexto de servidor y de
directorio. En contexto de servidor aplica el saludo est�ndar de SSL cuando se
establece una conexi�n. En contexto directorio fuerza una renegociaci�n SSL con 
el juego de cifrados despu�s de que la solicitud HTTP ha sido le�da pero antes de
que se env�e la respuesta.</p>
<p>
Una especificaci�n de cifrado SSL en <em>especificaci�n-de-cifrado</em> se compone de 4 
atributos principales m�s unos cuantos menores extra:</p>
<ul>
<li><em>Algoritmo de Intercambio de Clave</em>:<br />
    RSA, Diffie-Hellman, Elliptic Curve Diffie-Hellman, Secure Remote Password
</li>
<li><em>Algoritmo de Autenticaci�n</em>:<br />
    RSA, Diffie-Hellman, DSS, ECDSA, or none.
</li>
<li><em>Algoritmo de Cifrado/Encriptaci�n</em>:<br />
    AES, DES, Triple-DES, RC4, RC2, IDEA, etc.
</li>
<li><em>Algoritmo de Res�men de MAC</em>:<br />
    MD5, SHA or SHA1, SHA256, SHA384.
</li>
</ul>

<p>Un cifrado SSL puede ser un cifrado export. Los cifrados SSLv2 ya no est�n
soportados. Para especificar qu� cifrados usar, uno puede especificar todos
los cifrados a utilizar, de uno en uno, o puede usar pseud�nimos para
especificar la preferencia y orden de los cifrados (vea <a href="#table1">Tabla
1</a>). La lista actual de cifrados y pseud�nimos depende de la versi�n openssl
utilizada. Versiones m�s modernas de openssl pueden incluir cifrados 
adicionales.</p>

<table class="bordered">

<tr><th><a name="table1">Tag</a></th> <th>Description</th></tr>
<tr><td colspan="2"><em>Algoritmo de Intercambio de Clave:</em></td></tr>
<tr><td><code>kRSA</code></td>   <td>RSA key exchange</td></tr>
<tr><td><code>kDHr</code></td>   <td>Diffie-Hellman key exchange with RSA key</td></tr>
<tr><td><code>kDHd</code></td>   <td>Diffie-Hellman key exchange with DSA key</td></tr>
<tr><td><code>kEDH</code></td>   <td>Ephemeral (temp.key) Diffie-Hellman key exchange (no cert)</td>   </tr>
<tr><td><code>kSRP</code></td>   <td>Secure Remote Password (SRP) key exchange</td></tr>
<tr><td colspan="2"><em>Algoritmo de Autenticaci�n:</em></td></tr>
<tr><td><code>aNULL</code></td>  <td>No authentication</td></tr>
<tr><td><code>aRSA</code></td>   <td>RSA authentication</td></tr>
<tr><td><code>aDSS</code></td>   <td>DSS authentication</td> </tr>
<tr><td><code>aDH</code></td>    <td>Diffie-Hellman authentication</td></tr>
<tr><td colspan="2"><em>Algoritmo de Codificaci�n de Cifrado:</em></td></tr>
<tr><td><code>eNULL</code></td>  <td>No encryption</td>         </tr>
<tr><td><code>NULL</code></td>   <td>alias for eNULL</td>         </tr>
<tr><td><code>AES</code></td>    <td>AES encryption</td>        </tr>
<tr><td><code>DES</code></td>    <td>DES encryption</td>        </tr>
<tr><td><code>3DES</code></td>   <td>Triple-DES encryption</td> </tr>
<tr><td><code>RC4</code></td>    <td>RC4 encryption</td>       </tr>
<tr><td><code>RC2</code></td>    <td>RC2 encryption</td>       </tr>
<tr><td><code>IDEA</code></td>   <td>IDEA encryption</td>       </tr>
<tr><td colspan="2"><em>Algoritmo de Resumen de MAC</em>:</td></tr>
<tr><td><code>MD5</code></td>    <td>MD5 hash function</td></tr>
<tr><td><code>SHA1</code></td>   <td>SHA1 hash function</td></tr>
<tr><td><code>SHA</code></td>    <td>alias for SHA1</td> </tr>
<tr><td><code>SHA256</code></td> <td>SHA256 hash function</td> </tr>
<tr><td><code>SHA384</code></td> <td>SHA384 hash function</td> </tr>
<tr><td colspan="2"><em>Aliases:</em></td></tr>
<tr><td><code>SSLv3</code></td>  <td>all SSL version 3.0 ciphers</td> </tr>
<tr><td><code>TLSv1</code></td>  <td>all TLS version 1.0 ciphers</td> </tr>
<tr><td><code>EXP</code></td>    <td>all export ciphers</td>  </tr>
<tr><td><code>EXPORT40</code></td> <td>all 40-bit export ciphers only</td>  </tr>
<tr><td><code>EXPORT56</code></td> <td>all 56-bit export ciphers only</td>  </tr>
<tr><td><code>LOW</code></td>    <td>all low strength ciphers (no export, single DES)</td></tr>
<tr><td><code>MEDIUM</code></td> <td>all ciphers with 128 bit encryption</td> </tr>
<tr><td><code>HIGH</code></td>   <td>all ciphers using Triple-DES</td>     </tr>
<tr><td><code>RSA</code></td>    <td>all ciphers using RSA key exchange</td> </tr>
<tr><td><code>DH</code></td>     <td>all ciphers using Diffie-Hellman key exchange</td> </tr>
<tr><td><code>EDH</code></td>    <td>all ciphers using Ephemeral Diffie-Hellman key exchange</td> </tr>
<tr><td><code>ECDH</code></td>   <td>Elliptic Curve Diffie-Hellman key exchange</td>   </tr>
<tr><td><code>ADH</code></td>    <td>all ciphers using Anonymous Diffie-Hellman key exchange</td> </tr>
<tr><td><code>AECDH</code></td>    <td>all ciphers using Anonymous Elliptic Curve Diffie-Hellman key exchange</td> </tr>
<tr><td><code>SRP</code></td>    <td>all ciphers using Secure Remote Password (SRP) key exchange</td> </tr>
<tr><td><code>DSS</code></td>    <td>all ciphers using DSS authentication</td> </tr>
<tr><td><code>ECDSA</code></td>    <td>all ciphers using ECDSA authentication</td> </tr>
<tr><td><code>aNULL</code></td>   <td>all ciphers using no authentication</td> </tr>
</table>

<p>
La parte en que �sto se vuelve interesante es que �stos se pueden poner juntos
para especificar el orden y los cifrados que quiere usar. Para acelerar esto
tambi�n hay pseud�nimos (<code>SSLv3, TLSv1, EXP, LOW, MEDIUM,
HIGH</code>) para ciertos grupos de cifrados. Estas etiquetas se pueden juntar
con prefijos para formar <em>especificaci�n-de-cifrado</em>. Los prefijos disponibles son:</p>

<ul>
<li>none: a�ade cifrado a la lista</li>
<li><code>+</code>: mueve los cifrados coincidentes a la ubicaci�n actual en la 
lista</li>
<li><code>-</code>: borra los cifrados de la lista (se pueden a�adir m�s 
adelante)</li>
<li><code>!</code>: mata el cifrado de la lista completamente 
(<strong>no</strong> puede a�adirse despu�s)</li>
</ul>

<div class="note">
<h3>Los cifrados <code>aNULL</code>, <code>eNULL</code> y <code>EXP</code>
siempre est�n deshabilitados</h3>
<p>Empezando con la versi�n 2.4.7, null y cifrados de grado export
est�n siempre deshabilitados, asi que mod_ssl a�ade incondicionalmente 
<code>!aNULL:!eNULL:!EXP</code> a cualquier lista de cifrados en la 
inicializaci�n.</p>
</div>

<p>Una forma m�s sencilla de ver todo esto es usar el comando 
``<code>openssl ciphers -v</code>'' que facilita una buena forma de crear una
cadena correcta de <em>especificaci�n-de-cifrado</em>. La cadena <em>especificaci�n-de-cifrado</em> depende
de la versi�n de librer�as OpenSSL utilizadas. Supongamos que es
``<code>RC4-SHA:AES128-SHA:HIGH:MEDIUM:!aNULL:!MD5</code>'' que significa
lo siguiente: Pon <code>RC4-SHA</code> y <code>AES128-SHA</code> al principio.
Hacemos esto, porque estos cifrados ofrecen un buen compromiso entre velocidad y
seguridad. Despu�s, incluye los cifrados de seguridad alta y media. Finalmente,
elimina todos los cifrados que no autentican, p.ej. para SSL los cifrados 
An�nimos Diffie-Hellman, as� como todos los cifrados que usan <code>MD5</code> 
como algoritmo de hash porque se ha probado que son insuficientes.</p>
<div class="example"><pre>$ openssl ciphers -v 'RC4-SHA:AES128-SHA:HIGH:MEDIUM:!aNULL:!MD5'
RC4-SHA                 SSLv3 Kx=RSA      Au=RSA  Enc=RC4(128)  Mac=SHA1
AES128-SHA              SSLv3 Kx=RSA      Au=RSA  Enc=AES(128)  Mac=SHA1
DHE-RSA-AES256-SHA      SSLv3 Kx=DH       Au=RSA  Enc=AES(256)  Mac=SHA1
...                     ...               ...     ...           ...
SEED-SHA                SSLv3 Kx=RSA      Au=RSA  Enc=SEED(128) Mac=SHA1
PSK-RC4-SHA             SSLv3 Kx=PSK      Au=PSK  Enc=RC4(128)  Mac=SHA1
KRB5-RC4-SHA            SSLv3 Kx=KRB5     Au=KRB5 Enc=RC4(128)  Mac=SHA1</pre></div>
<p>La lista completa de cifrados RSA &amp; DH concretos para SSL se facilita en
la <a href="#table2">Tabla 2</a>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLCipherSuite RSA:!EXP:!NULL:+HIGH:+MEDIUM:-LOW</pre>
</div>
<table class="bordered">

<tr><th><a name="table2">Cipher-Tag</a></th> <th>Protocol</th> <th>Key Ex.</th> <th>Auth.</th> <th>Enc.</th> <th>MAC</th> <th>Type</th> </tr>
<tr><td colspan="7"><em>RSA Ciphers:</em></td></tr>
<tr><td><code>DES-CBC3-SHA</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>3DES(168)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>IDEA-CBC-SHA</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>IDEA(128)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>RC4-SHA</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>RC4(128)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>RC4-MD5</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>RC4(128)</td> <td>MD5</td> <td /> </tr>
<tr><td><code>DES-CBC-SHA</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>DES(56)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>EXP-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>RSA(512)</td> <td>RSA</td> <td>DES(40)</td> <td>SHA1</td> <td> export</td> </tr>
<tr><td><code>EXP-RC2-CBC-MD5</code></td> <td>SSLv3</td> <td>RSA(512)</td> <td>RSA</td> <td>RC2(40)</td> <td>MD5</td> <td>  export</td> </tr>
<tr><td><code>EXP-RC4-MD5</code></td> <td>SSLv3</td> <td>RSA(512)</td> <td>RSA</td> <td>RC4(40)</td> <td>MD5</td> <td>  export</td> </tr>
<tr><td><code>NULL-SHA</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>None</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>NULL-MD5</code></td> <td>SSLv3</td> <td>RSA</td> <td>RSA</td> <td>None</td> <td>MD5</td> <td /> </tr>
<tr><td colspan="7"><em>Diffie-Hellman Ciphers:</em></td></tr>
<tr><td><code>ADH-DES-CBC3-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>None</td> <td>3DES(168)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>ADH-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>None</td> <td>DES(56)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>ADH-RC4-MD5</code></td> <td>SSLv3</td> <td>DH</td> <td>None</td> <td>RC4(128)</td> <td>MD5</td> <td /> </tr>
<tr><td><code>EDH-RSA-DES-CBC3-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>RSA</td> <td>3DES(168)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>EDH-DSS-DES-CBC3-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>DSS</td> <td>3DES(168)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>EDH-RSA-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>RSA</td> <td>DES(56)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>EDH-DSS-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH</td> <td>DSS</td> <td>DES(56)</td> <td>SHA1</td> <td /> </tr>
<tr><td><code>EXP-EDH-RSA-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH(512)</td> <td>RSA</td> <td>DES(40)</td> <td>SHA1</td> <td> export</td> </tr>
<tr><td><code>EXP-EDH-DSS-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH(512)</td> <td>DSS</td> <td>DES(40)</td> <td>SHA1</td> <td> export</td> </tr>
<tr><td><code>EXP-ADH-DES-CBC-SHA</code></td> <td>SSLv3</td> <td>DH(512)</td> <td>None</td> <td>DES(40)</td> <td>SHA1</td> <td> export</td> </tr>
<tr><td><code>EXP-ADH-RC4-MD5</code></td> <td>SSLv3</td> <td>DH(512)</td> <td>None</td> <td>RC4(40)</td> <td>MD5</td> <td>  export</td> </tr>
</table>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcompression" id="sslcompression">Directiva</a> <a name="SSLCompression" id="SSLCompression">SSLCompression</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa la compresi�n a nivel de SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCompression on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLCompression off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.3 y posterior, si se usa OpenSSL 0.9.8 o
posterior; disponible en el contexto de virtualhost si se usa OpenSSL 1.0.0 o
posterior. El valor por defecto sol�a ser <code>on</code> en la versi�n 
2.4.3</td></tr>
</table>
<p>Esta directiva permite activar la compresi�n a nivel de SSL.</p>
<div class="warning">
<p>Activar la compresi�n provoca problemas de seguridad en la mayor�a de las
configuraciones (como el conocido ataque CRIME).</p>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslcryptodevice" id="sslcryptodevice">Directiva</a> <a name="SSLCryptoDevice" id="SSLCryptoDevice">SSLCryptoDevice</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activar el uso de un hardware acelerador criptogr�fico</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLCryptoDevice <em>engine</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLCryptoDevice builtin</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva activa el uso de una placa hardware acelerador criptogr�fico 
para aliviar parte de la carga del procesamiento de SSL. Esta directiva
s�lo puede usarse si el kit de herramientas SSL est� compilado con soporte de
"engine"; OpenSSL 0.9.7 y posteriores versiones tienen soporte de "engine" por
defecto, en versiones Openssl 0.9.6 debe usarse "-engine".</p>

<p>Para descubrir qu� nombres de "engine" est�n soportados, ejecute el comando
"<code>openssl engine</code>".</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config"># For a Broadcom accelerator:
SSLCryptoDevice ubsec</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslengine" id="sslengine">Directiva</a> <a name="SSLEngine" id="SSLEngine">SSLEngine</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Interruptor de Activaci�n del motor SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLEngine on|off|optional|addr[:port] [addr[:port]] ...</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLEngine off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>El par�metro <code>addr:port</code> est� disponible en Apache 
2.4.30 y posterior.</td></tr>
</table>
<p>
Esta directiva sirve para activar o desactivar el uso del motor del protocolo
SSL/TLS. Los valores 'on', 'off' y 'optional' deber�an usarse dentro de una
secci�n <code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> para
activar SSL/TLS para un host virtual. Por defecto el motor de SSL/TLS est�
deshabilitado para ambos el servidor principal y todos los host virtuales
configurados.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">&lt;VirtualHost _default_:443&gt;
SSLEngine on
#...
&lt;/VirtualHost&gt;</pre>
</div>
<p>Se deber�an usar los valores <code>addr:port</code> en la configuraci�n 
global del servidor para activar el motor del Protocolo SSL/TLS para 
<em>todos</em> los
<code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> 
que coincidan con una de las direcciones de la lista.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLEngine *:443
&lt;VirtualHost *:443&gt;
#...
&lt;/VirtualHost&gt;</pre>
</div>
<p><code class="directive">SSLEngine</code> puede ser configurado a
<code>optional</code>: esto activa el soporte de 
<a href="http://www.ietf.org/rfc/rfc2817.txt">RFC 2817</a>.
</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslfips" id="sslfips">Directiva</a> <a name="SSLFIPS" id="SSLFIPS">SSLFIPS</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Interruptor del modo SSL FIPS</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLFIPS on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLFIPS off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva activa o desactiva el uso de FIPS_mode en la librer�a SSL. Esto
debe ponerse en el contexto de la configuraci�n global del servidor y no puede 
configurarse con otras configuraciones que especifiquen lo contrario (SSLFIPS on 
seguido de SSLFIPS off o similar). Este modo se aplica a todas las operaciones
de la librer�a SSL.
</p>

<p>
Si httpd fuera compilado contra una librer�a SSL que no soporta FIPS_mode, 
<code>SSLFIPS on</code> fallar�. Vea el documento de Pol�ticas de Seguridad
FIPS 140-2 de su proveedor de librer�a SSL para requerimientos espec�ficos para
usar mod_ssl en un modo de operaci�n aprobado; tenga en cuenta que mod_ssl
en s� mismo no est� validado, pero puede ser descrito como un m�dulo 
validado de criptofraf�a FIPS 140-2, cuando todos los componentes son montados
y gestionados bajo las reglas impuestas por la Pol�tica de Seguridad aplicable.
</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslhonorcipherorder" id="sslhonorcipherorder">Directiva</a> <a name="SSLHonorCipherOrder" id="SSLHonorCipherOrder">SSLHonorCipherOrder</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Opci�n para forzar el orden de preferencia de cifrados del 
  servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLHonorCipherOrder on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLHonorCipherOrder off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Cuando se selecciona un cifrado durante el saludo SSLv3 o TLSv1, normalmente
se selecciona en funci�n de las preferencias del cliente. Con esta directiva
activada, se usar� la preferencia del servidor en su lugar.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLHonorCipherOrder on</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslinsecurerenegotiation" id="sslinsecurerenegotiation">Directiva</a> <a name="SSLInsecureRenegotiation" id="SSLInsecureRenegotiation">SSLInsecureRenegotiation</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Opci�n para activar soporte de renegociaci�n 
  insegura</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLInsecureRenegotiation on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLInsecureRenegotiation off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8m o posterior</td></tr>
</table>
<p>Tal y como se especific� originalmente, todas las versiones de protocolo SSL y
TLS (inclu�do TLS/1.2) eran vulnerables a ataques tipo Man-in-the-Middle
(<a href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CAN-2009-3555">CVE-2009-3555</a>)
durante una renegociaci�n. Esta vulnerabilidad permit�a a un atancante poner
un prefijo a un texto plano espec�fico en la petici�n HTTP tal y como se ve�a 
en el servidor web. Se desarroll� una extensi�n del protocolo para esta vulnerabilidad si estaba soportada tanto por el cliente como por el 
servidor.</p>

<p>Si <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> est� compilado contra la versi�n OpenSSL 0.9.8m
o posterior, por defecto la renegociaci�n s�lo est� soportada por clientes
que tengan soporte para la nueva extensi�n del protocolo. Si esta directiva est�
activada, la renegociaci�n se permitir� con los clientes antiguos (no 
parcheados), aunque de manera insegura.</p>

<div class="warning"><h3>Aviso de Seguridad</h3>
<p>Si se activa esta directiva, las conexiones SSL ser�n vulnerables a ataques
Man-in-the-Middle de prefijo tal y como se describe en
<a href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CAN-2009-3555">CVE-2009-3555</a>.</p>
</div>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLInsecureRenegotiation on</pre>
</div>

<p>La variable de entorno <code>SSL_SECURE_RENEG</code> se puede usar desde un 
script CGI o desde SSI para determinar si la renegociaci�n segura est� soportada
para la conexi�n SSL en cuesti�n.</p>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspdefaultresponder" id="sslocspdefaultresponder">Directiva</a> <a name="SSLOCSPDefaultResponder" id="SSLOCSPDefaultResponder">SSLOCSPDefaultResponder</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura la URI por defecto del respondedor para la validaci�n
OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSDefaultResponder <em>uri</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n configura el respondedor OCSP por defecto a usar. Si 
<code class="directive"><a href="#sslocspoverrideresponder">SSLOCSPOverrideResponder</a></code> no est�
activada, la URI facilitada se usar� si no hay una URI de respondedor en el
certificado que est� siendo verificado.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspenable" id="sslocspenable">Directiva</a> <a name="SSLOCSPEnable" id="SSLOCSPEnable">SSLOCSPEnable</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa la validaci�n OCSP para la cadena de certificados del 
cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPEnable on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPEnable off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n activa la validaci�n OCSP de la cadena de certificados del 
cliente. Si esta opci�n est� activada, los certificados en la cadena de 
certificados del cliente se validar�n contra un respondedor OCSP despu�s de que
se hayan hecho las verificaciones normales (incluidas las comprobaciones de 
CRL).</p>

<p>El respondedor OCSP utilizado o bien se extrae del mismo certificado, o 
derivado de la configuraci�n; vea las directivas 
<code class="directive"><a href="#sslocspdefaultresponder">SSLOCSPDefaultResponder</a></code> y
<code class="directive"><a href="#sslocspoverrideresponder">SSLOCSPOverrideResponder</a></code>
directives.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLVerifyClient on
SSLOCSPEnable on
SSLOCSPDefaultResponder "http://responder.example.com:8888/responder"
SSLOCSPOverrideResponder on</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspnoverify" id="sslocspnoverify">Directiva</a> <a name="SSLOCSPNoverify" id="SSLOCSPNoverify">SSLOCSPNoverify</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Salta la verificaci�n de certificados de respondedor 
  OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPNoverify <em>On/Off</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPNoverify Off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.26 y posterior, si se usa OpenSSL 0.9.7 o
posterior</td></tr>
</table>
<p>Salta la verificaci�n de certificados del respondedor OCSP, generalmente
�til cuando se comprueba un servidor OCSP.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspoverrideresponder" id="sslocspoverrideresponder">Directiva</a> <a name="SSLOCSPOverrideResponder" id="SSLOCSPOverrideResponder">SSLOCSPOverrideResponder</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fuerza el uso de una URI de respondedor por defecto para la 
validaci�n OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPOverrideResponder on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPOverrideResponder off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n fuerza que se use el respondedor OCSP por defecto para la 
validaci�n OCSP del certificado, independientemente de si el certificado que
se est� validando referencia un respondedor OCSP o no.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspproxyurl" id="sslocspproxyurl">Directiva</a> <a name="SSLOCSPProxyURL" id="SSLOCSPProxyURL">SSLOCSPProxyURL</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>URL de Proxy a utilizar para las consultas OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPProxyURL <em>url</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.19 y posterior</td></tr>
</table>
<p>Esta opci�n permite configurar la URL de un proxy HTTP que deber�a usarse para
todas las consultas a respondedores OCSP.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocsprespondercertificatefile" id="sslocsprespondercertificatefile">Directiva</a> <a name="SSLOCSPResponderCertificateFile" id="SSLOCSPResponderCertificateFile">SSLOCSPResponderCertificateFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Conjunto de certificados de respondedor OCSP confiables codificados
  en PEM</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPResponderCertificateFile <em>fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.26 y posterior, si se usa con OpenSSL 
  0.9.7 o posterior</td></tr>
</table>

<p>Esto aporta una lista de certificados confiables de respondedor OCSP para
ser usados durante la validaci�n de certificados de respondedor OCSP. Se conf�a
en los certificados facilitados de manera impl�cita sin ninguna comprobaci�n
posterior. Esto se usa generalmente cuando el certificado del respondedor
OCSP es autofirmado o se omite de la respuesta.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocsprespondertimeout" id="sslocsprespondertimeout">Directiva</a> <a name="SSLOCSPResponderTimeout" id="SSLOCSPResponderTimeout">SSLOCSPResponderTimeout</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Expiraci�n de las consultas OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPResponderTimeout <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPResponderTimeout 10</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n configura el tiempo de expiraci�n para las consultas a los 
respondedores OCSP, cuando <code class="directive"><a href="#sslocspenable">SSLOCSPEnable</a></code> 
est� activado.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspresponsemaxage" id="sslocspresponsemaxage">Directiva</a> <a name="SSLOCSPResponseMaxAge" id="SSLOCSPResponseMaxAge">SSLOCSPResponseMaxAge</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Edad m�xima permitida para las respuestas OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPResponseMaxAge <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPResponseMaxAge -1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n configura la edad m�xima permitida de las respuestas
OCSP. El valor por defecto (<code>-1</code>) no fuerza una edad m�xima, lo que
significa que las respuestas OCSP se consideran v�lidas mientras su campo
<code>nextUpdate</code> est� en una fecha futura.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspresponsetimeskew" id="sslocspresponsetimeskew">Directiva</a> <a name="SSLOCSPResponseTimeSkew" id="SSLOCSPResponseTimeSkew">SSLOCSPResponseTimeSkew</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Desviaci�n m�xima de tiempo permitida para la validaci�n de la
respuesta OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPResponseTimeSkew <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPResponseTimeSkew 300</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Esta opci�n configura el tiempo m�ximo permitido de desviaci�n para las
respuestas OCSP
(cuando se est�n comprobando sus campos <code>thisUpdate</code> y 
<code>nextUpdate</code>).</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslocspuserequestnonce" id="sslocspuserequestnonce">Directiva</a> <a name="SSLOCSPUseRequestNonce" id="SSLOCSPUseRequestNonce">SSLOCSPUseRequestNonce</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Usar un nonce dentro de las consultas OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOCSPUseRequestNonce on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLOCSPUseRequestNonce on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.10 y posterior</td></tr>
</table>
<p>Esta opci�n determina si las consultas a respondedores OCSP deber�an contener
un "nonce" o no. Por defecto, una consulta "nonce" siempre se comprueba y se usa
contra la de la respuesta. Cuando el responderdor no usa "nonce"s (p.ej. Microsoft
OCSP Responder), esta opci�n deber�a estar configuada a 
<code>off</code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslopensslconfcmd" id="sslopensslconfcmd">Directiva</a> <a name="SSLOpenSSLConfCmd" id="SSLOpenSSLConfCmd">SSLOpenSSLConfCmd</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura par�metros OpenSSL a trav�s de su API <em>SSL_CONF</em>
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOpenSSLConfCmd <em>nombre-de-comando</em> 
<em>par�metro-de-comando</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.8 y posterior, si se usa OpenSSL 1.0.2 o
posterior</td></tr>
</table>
<p>Esta directiva expone <em>SSL_CONF</em> de la API de OpenSSL para mod_ssl, 
permitiendo una configuraci�n flexible de par�metros para OpenSSL sin la 
necesidad de implementar directivas adicionales de <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> 
cuando se a�aden nuevas caracter�sticas a OpenSSL.</p>

<p>El conjunto de comandos disponibles de 
<code class="directive">SSLOpenSSLConfCmd</code> depende de la versi�n OpenSSL utilizada 
para <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> (al menos la versi�n 1.0.2 es necesaria). Para una 
lista de nombres de comandos
soportados, vea la secci�n <em>Comandos soportados para fichero de 
configuraci�n</em> en la p�gina de manual 
<a href="http://www.openssl.org/docs/man1.0.2/ssl/SSL_CONF_cmd.html#SUPPORTED-CONFIGURATION-FILE-COMMANDS">SSL_CONF_cmd(3)</a> 
de OpenSSL.</p>

<p>Algunos de los comandos de <code class="directive">SSLOpenSSLConfCmd</code> se pueden
usar como alternativa a directivas existentes (tales como
<code class="directive"><a href="#sslciphersuite">SSLCipherSuite</a></code> o
<code class="directive"><a href="#sslprotocol">SSLProtocol</a></code>),
aunque deber�a tenerse en cuenta que la sintaxis / valores disponibles para
par�metros pueden ser diferentes.</p>

<div class="example"><h3>Ejemplos</h3><pre class="prettyprint lang-config">SSLOpenSSLConfCmd Options -SessionTicket,ServerPreference
SSLOpenSSLConfCmd ECDHParameters brainpoolP256r1
SSLOpenSSLConfCmd ServerInfoFile "/usr/local/apache2/conf/server-info.pem"
SSLOpenSSLConfCmd Protocol "-ALL, TLSv1.2"
SSLOpenSSLConfCmd SignatureAlgorithms RSA+SHA384:ECDSA+SHA256</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="ssloptions" id="ssloptions">Directiva</a> <a name="SSLOptions" id="SSLOptions">SSLOptions</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configurar varias opciones del motor SSL en tiempo 
  real</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLOptions [+|-]<em>opci�n</em> ...</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>Options</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva puede usarse para controlar varias opciones en tiempo real en 
contexto directorio. Normalmente, si m�ltiples <code>SSLOptions</code>
pueden aplicar a un directorio, entonces se usar� la m�s 
espec�fica; las opciones no se fusionan. Sin embargo, si <em>todas</em> las 
opciones en la directiva <code>SSLOptions</code> est�n precedidas de un signo
m�s (<code>+</code>) o menos (<code>-</code>), las opciones se fusionan.
Cualquier opci�n precedida de un  <code>+</code> es a�adida a las opciones que
se est�n aplicando en ese momento, y cualquier opci�n precedida de un 
<code>-</code> se elimina de las opciones aplicadas en ese momento.</p>
<p>
Las <em>opciones</em> disponibles son:</p>
<ul>
<li><code>StdEnvVars</code>
    <p>
    Cuando esta opci�n est� habilitada, se generan las variables de entorno 
    est�ndar de SSL relacionadas con CGI/SSI. Esto est� desactivado por defecto
    por razones de rendimiento, porque el paso de extracci�n de la informaci�n
    es una operaci�n bastante costosa. As� que uno s�lo activar�a esta opci�n 
    para peticiones CGI o SSI.</p>
</li>
<li><code>ExportCertData</code>
    <p>
    Cuando se activa esta opci�n, se generan variables de entorno CGI/SSI 
    adicionales: <code>SSL_SERVER_CERT</code>, <code>SSL_CLIENT_CERT</code> y
    <code>SSL_CLIENT_CERT_CHAIN_</code><em>n</em> (con <em>n</em> = 0,1,2,..).
    Estas contienen los certificados X.509 codificados en PEM del servidor
    y el cliente para la conexi�n actual HTTPs y pueden usarse por scripts CGI
    para una comprobaci�n m�s detallada de los Certificados. Adicionalmente 
    tambi�n se facilitan todos los dem�s certificados de la cadena  del 
    certificado cliente. Esto carga el entorno de variables un poco, as�
    que por esto deber� usar esta opci�n para activarla s�lo cuando sea 
    necesario.</p>
</li>
<li><code>FakeBasicAuth</code>
    <p>
    Cuando se activa esta opci�n, el Nombre Distinguido de Sujeto (DN) del 
    Certificado Cliente X509 se traduce a un nombre de Autenticaci�n HTTP B�sica.
    Esto significa que se pueden usar los m�todos est�ndar de autenticaci�n para
    control de acceso. El nombre de usuario es tan s�lo el Sujeto del 
    Certificado Cliente X509 (se puede determinar ejecutando el comando 
    de OpenSSL <code>openssl x509</code>: <code>openssl x509 -noout -subject -in
    </code><em>certificado</em><code>.crt</code>). La directiva 
    <code class="directive"><a href="#sslusername">SSLUserName</a></code> puede usarse para 
    especificar qu�
    parte del Sujeto del Certificado est� embebida en el nombre de usuario.
    Tenga en cuenta que no se obtiene ninguna contrase�a del usuario. Cada 
    entrada en el fichero de usuario necesita esta contrase�a: 
    ``<code>xxj31ZMTZzkVA</code>'', que es la versi�n encriptada en DES de la
    palabra `<code>password</code>''. Aquellos que viven bajo la encriptaci�n
    basada en MD5 (por ejemplo bajo FreeBSD or BSD/OS, etc.) deber�a usar
    el siguiente hash MD5 de la misma palabra:
     ``<code>$1$OXLyS...$Owx8s2/m9/gfkcRVXzgoE/</code>''.</p>

    <p>Tenga en cuenta que 
    la directiva <code class="directive"><a href="../mod/mod_auth_basic.html#authbasicfake">AuthBasicFake</a></code>
    dentro de <code class="module"><a href="../mod/mod_auth_basic.html">mod_auth_basic</a></code> puede usarse como un mecanismo
    general para fingir la autenticaci�n b�sica, dando control sobre la 
    estructura tanto del nombre como de la contrase�a.</p>

    <div class="warning">
      <p>Los nombres de usuarios utilizados para <code>FakeBasicAuth</code> no
      deben incluir caracteres no-ASCII, caracteres de escape ASCII (tales como
      el de nueva l�nea), o una coma. Si se encuentra una coma, se generar�
      un error 403 Forbidden con httpd 2.5.1 y posterior.</p>
    </div>
</li>
<li><code>StrictRequire</code>
    <p>
    Esto <em>fuerza</em> acceso prohibido cuando <code>SSLRequireSSL</code> o
    <code>SSLRequire</code> deciden satisfactoriamente que el acceso deber�a
    denegarse. Generalmente por defecto en el caso donde se usa una
    directiva ``<code>Satisfy any</code>'', y se pasan otras restricciones de 
    acceso, se sobreescribe la denegaci�n del acceso debido a 
    <code>SSLRequireSSL</code> o <code>SSLRequire</code> (porque as� es como
    deber�a funcionar el mecanismo <code>Satisfy</code> de Apache .) Pero para
    la restricci�n estricta de acceso puede usar <code>SSLRequireSSL</code> y/o 
    <code>SSLRequire</code> en combinaci�n con un 
    ``<code>SSLOptions +StrictRequire</code>''. Entonces un 
    ``<code>Satisfy Any</code>'' adicional no tiene oportunidad una vez que
    mod_ssl ha decidido denegar el acceso.</p>
</li>
<li><code>OptRenegotiate</code>
    <p>
    Esto activa la gesti�n optimizada de renegociaci�n de conexi�n SSL cuando
    se usan directivas SSL en contexto de directorio. Por defecto un esquema
    estricto est� habilitado donde <em>cada</em> reconfiguraci�n de directorio de
    par�metros SSL provoca una renegociaci�n <em>total</em> del saludo SSL. 
    Cuando se usa esta opci�n mod_ssl intenta evitar saludos SSL innecesarios
    haciendo comprobaciones m�s espec�ficas (pero todav�a seguras) de par�metros.
    Sin embargo estas comprobaciones m�s espec�ficas pueden no ser lo que espera
    el usuario, as� que, lo recomendable es que active �sto s�lo en contexto
    directorio.</p>
</li>
<li><code>LegacyDNStringFormat</code>
    <p>
    Esta opci�n influencia c�mo se formatean los valores de las variables
    <code>SSL_{CLIENT,SERVER}_{I,S}_DN</code>. Desde la versi�n 2.3.11, Apache 
    HTTPD usa un formato compatible RFC 2253 por defecto. Esto usa comas como 
    delimitadores entre atributos, permite el uso de caracteres no-ASCII (que 
    son convertidos a UTF-8), escapa varios caracteres especiales con barra 
    invertida "\", y ordena los atributos con el atributo "C" al final.</p>

    <p>Si se activa <code>LegacyDNStringFormat</code>, el formato antiguo 
    que ordena el atributo "C" el primero ser� utilizado, usa barras como 
    separadores y no manipula caracteres no-ASCII y especiales de ninguna forma 
    consistente.
    </p>
</li>
</ul>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLOptions +FakeBasicAuth -StrictRequire
&lt;Files ~ "\.(cgi|shtml)$"&gt;
    SSLOptions +StdEnvVars -ExportCertData
&lt;/Files&gt;</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslpassphrasedialog" id="sslpassphrasedialog">Directiva</a> <a name="SSLPassPhraseDialog" id="SSLPassPhraseDialog">SSLPassPhraseDialog</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tipo de d�alogo de solicitud de contrase�a para claves privadas 
  encriptadas</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLPassPhraseDialog <em>tipo</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLPassPhraseDialog builtin</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Cuando Apache arranca tiene que leer varios ficheros Certificado (vea
<code class="directive"><a href="#sslcertificatefile">SSLCertificateFile</a></code>) y Clave Privada 
(vea 
<code class="directive"><a href="#sslcertificatekeyfile">SSLCertificateKeyFile</a></code>) de los servidores
virtuales que tienen SSL activado. Por razones de seguridad los ficheros
de clave privada est�n generalmente encriptados, mod_ssl necesita preguntar al
administrador por la contrase�a para desencriptar esos ficheros. Esta solicitud
puede hacerse de dos maneras que se pueden configurar por
<em>tipo</em>:</p>
<ul>
<li><code>builtin</code>
    <p>
    Este es el m�todo por defecto donde una ventana de terminal interactiva
    aparece al inicio antes que Apache pase a segundo plano. Aqu� un
    administrador tiene que introducir manualmente la contrase�a para cada
    fichero de Clave Privada Encriptada. Puesto que puede haber muchos 
    hosts virtuales configurados con SSL, se usa el siguiente esquema de 
    reutilizaci�n para minimizar el n�mero de veces que se pide la contrase�a:
    Cuanto un fichero de clave privada est� encriptado, se intentar� usar
    todas las Contrase�as conocidas (al principio no hay ninguna, por supuesto). 
    Si una de esas contrase�as conocidas funciona no se abre ventana de di�logo
    para este fichero de clave privada en particular. Si ninguna funciona, 
    se vuelve a solicitar la contrase�a en la terminal y se recuerda para las
    siguientes (donde quiz�s se pueden reutilizar).</p>
    <p>
    Este esquema permite a mod_ssl ser flexible al m�ximo (porque para N 
    ficheros de Clave Privada Encriptados <em>usted puede</em> usar N 
    contrase�as diferentes - pero entonces tiene que introducir todas ellas, por
    supuesto) al mismo tiempo que se minimizan las solicitudes de contrase�a
    por terminal (p.ej. cuando usa una sola contrase�a para todos los N ficheros
    de Clave Privada esta contrase�a s�lo se pide una vez).</p></li>

<li><code>|/path/to/program [args...]</code>

   <p>Este modo permite que se use un programa externo que act�a como tuber�a a
    un dispositivo de entrada en particular; al programa se le env�a la 
    solicitud est�ndar de texto que se usa para el modo <code>builtin</code> en
   <code>stdin</code>, y se espera que escriba cadenas de caracteres de 
   contrase�as en <code>stdout</code>. Si se necesitan varias contrase�as (o si
   se introduce una contrase�a incorrecta), se escribir�n solicitudes de 
   contrase�a adicionales y se tendr� que devolver m�s contrase�as a trav�s
   de dicho programa.</p></li>

<li><code>exec:/path/to/program</code>
    <p>
    Aqu� se configura un programa externo que se lanza en el arranque para cada
    uno de los ficheros de Clave Privada encriptados. Se le llama con un s�lo
    par�metro, una cadena de caracteres de la forma 
    ``<code>servername:portnumber:index</code>'' (cuando <code>index</code> es 
    un n�mero basado en una secuencia de ceros), que indica para qu� servidor,
    puerto TCP y n�mero de certificado debe imprimir la Contrase�a
    correspondiente a <code>stdout</code>.  La intenci�n es que este programa 
    externo primero ejecuta comprobaciones de seguridad para asegurar que el 
    sistema no se ha visto comprometido por un atacante, y s�lo cuando estas
    comprobaciones se realizan satisfactoriamente entonces facilita la
    Contrase�a.</p>

    <p>
    Ambas comprobaciones de seguridad y el m�todo en que se determina la 
    contrase�a, puede ser tan complejo como usted desee. Mod_ssl s�lo define 
    el interfaz: un programa ejecutable que provee la contrase�a en 
    <code>stdout</code>. Ni m�s y ni menos. As� que, si usted es realmente
    paranoico con la seguridad, este es su interfaz. Cualquier otra cosa se debe
    dejar como un trabajo para el administrador, porque los requerimientos de 
    seguridad local son muy diferentes.</p>
    
    <p>
    El algoritmo de reutilizaci�n descrito previamente se usa aqu� tambi�n. En 
    otras palabras: se llama s�lo una vez al programa externo cuando hay una 
    �nica contrase�a.</p></li>
</ul>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLPassPhraseDialog "exec:/usr/local/apache/sbin/pp-filter"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslpolicy" id="sslpolicy">Directiva</a> <a name="SSLPolicy" id="SSLPolicy">SSLPolicy</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Aplica una Pol�tica SSL por nombre</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLPolicy <em>nombre</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.30 y posterior</td></tr>
</table>
<p>Esta directiva aplica el conjunto de directivas SSL definidas bajo
'nombre' (vea <code class="directive">&lt;SSLPolicyDefine&gt;</code>) como las
configuraciones <em>base</em> en el contexto actual. Apache viene con las 
siguientes pol�ticas pre-definidas de Mozilla, los desarrolladores del 
navegador Firefox 
(<a href="https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_configurations">
vea aqu� para una descripci�n detallada de ellas.</a>):
</p>
<ul>
    <li><code>modern</code>: recomendada cuando su servidor es accesible desde
    Internet. Funciona con todos los navegadores modernos, pero dispositivos
    antiguos podr�an no ser capaces de conectar.</li>
    <li><code>intermediate</code>: el recurso si necesita dar soporte a clientes
    antiguos (pero no muy antiguos).</li>
    <li><code>old</code>: cuando necesita dar acceso a Windows XP/Internet
    Explorer 7. El �ltimo recurso.</li>
</ul>

<p>Puede comprobar una descripci�nm detallada de todas las pol�ticas definidas
a trav�s de la l�nea de comandos:</p>
<div class="example"><h3>Listar Todas las Pol�ticas Definidas</h3><pre class="prettyprint lang-sh">httpd -t -D DUMP_SSL_POLICIES</pre>
</div>

<p>Una SSLPolicy define la l�nea base para el contexto en la que se utiliza. Eso
significa que cualquier otra diretiva SSL en el mismo contexto la sobreescribir�.
Como ejemplo de esto, vea el valor efectivo de 
<code class="directive">SSLProtocol</code> en la siguiente configuraci�n:</p>

<div class="example"><h3>Precedencia de Pol�tica</h3><pre class="prettyprint lang-config">&lt;VirtualHost...&gt; # efectivo en: 'all'
   SSLPolicy modern
   SSLProtocol all
&lt;/VirtualHost&gt;

&lt;VirtualHost...&gt; # efectivo en: 'all'
   SSLProtocol all
   SSLPolicy modern
&lt;/VirtualHost&gt;

SSLPolicy modern
&lt;VirtualHost...&gt; # efectivo en: 'all'
   SSLProtocol all
&lt;/VirtualHost&gt;
   
SSLProtocol all
&lt;VirtualHost...&gt; # efectivo en: '+TLSv1.2'
  SSLPolicy modern
&lt;/VirtualHost&gt;</pre>
</div>

<p>Puede haber m�s de una pol�tica aplicada en un contexto. La �ltimas 
sobreescribiendo las previas: :</p>

<div class="example"><h3>Ordenando Pol�ticas</h3><pre class="prettyprint lang-config">&lt;VirtualHost...&gt; # protocolo efectivo: 'all -SSLv3'
   SSLPolicy modern
   SSLPolicy intermediate
&lt;/VirtualHost&gt;

&lt;VirtualHost...&gt; # protocolo efectivo: '+TLSv1.2'
   SSLPolicy intermediate
   SSLPolicy modern
&lt;/VirtualHost&gt;</pre>
</div>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslpolicydefinesection" id="sslpolicydefinesection">Directiva</a> <a name="SSLPolicyDefinesection" id="SSLPolicyDefinesection">&lt;SSLPolicyDefine&gt;</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Define un conjunto de nombres de configuraciones SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>&lt;SSLPolicyDefine <em>nombre</em>&gt;</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible in httpd 2.4.30 y posterior</td></tr>
</table>
<p>Esta directiva define un conjunto de configuraciones SSL y les da un nombre.
Este nombre se puede usar en las directivas <code class="directive">SSLPolicy</code> y 
<code class="directive">SSLProxyPolicy</code> para aplicar esta configuraci�n en el 
contexto actual.</p>

<div class="example"><h3>Definici�n y Uso de una Pol�tica</h3><pre class="prettyprint lang-config">&lt;SSLPolicyDefine safe-stapling&gt;
   SSLUseStapling on
   SSLStaplingResponderTimeout 2
   SSLStaplingReturnResponderErrors off
   SSLStaplingFakeTryLater off
   SSLStaplingStandardCacheTimeout 86400
&lt;/SSLPolicyDefine&gt;

   ...
   &lt;VirtualHost...&gt;
      SSLPolicy safe-stapling
      ...</pre>
</div>

<p>Por un lado, esto puede hacer que la configuraci�n del servidor sea mucho
m�s f�cil de <em>leer</em> y <em>mantener</em>. Por otro lado, est� destinada
a hacer SSL m�s f�cil y seguro de <em>usar</em>. Para lo �ltimo, Apache httpd
viene con un conjunto de pol�ticas pre-definidas que reflejan buenas pr�cticas
de c�digo abierto. La pol�tica "modern", por ejemplo, lleva las configuraciones
para hacer que su servidor trabaje de manera segura y compatible con navegadores
actuales.</p>

<p>La lista de pol�ticas predefinidas en su Apache pueden obtenerse lanzando
el siguiente comando. Esta lista muestra las configuraciones detalladas con
las que est� definida cada pol�tica:</p>

<div class="example"><h3>Lista todas las Pol�ticas Definidas</h3><pre class="prettyprint lang-sh">httpd -t -D DUMP_SSL_POLICIES</pre>
</div>

<p>Esta directiva s�lo se puede usar en la configuraci�n del servidor (contexto
global). Puede usar la mayor�a de las directivas SSL*, sin embargo algunas s�lo
se pueden usar una vez y no se pueden utilizar dentro de definiciones de 
pol�tica. Estas son  <code class="directive">SSLCryptoDevice</code>, 
<code class="directive">SSLRandomSeed</code>, 
<code class="directive">SSLSessionCache</code> y
<code class="directive">SSLStaplingCache</code>.
</p>

<p>Dos pol�ticas no pueden tener el mismo nombre. Sin embargo, las pol�ticas se
pueden redefinir:</p>

<div class="example"><h3>Sobreescribir Pol�ticas</h3><pre class="prettyprint lang-config">&lt;SSLPolicyDefine proxy-trust&gt;
   SSLProxyVerify require
&lt;/SSLPolicyDefine&gt;
   ...
&lt;SSLPolicyDefine proxy-trust&gt;
   SSLProxyVerify none
&lt;/SSLPolicyDefine&gt;</pre>
</div>

<p>Las definiciones de Pol�tica se <em>a�aden</em> en el orden que aparecen, 
pero se <em>aplican</em> cuando se ha leido toda la configuraci�n. Esto 
significa que cualquier uso de 'proxy-trust' significar� 'SSLProxyVerify none'. 
La primera definici�n no tiene ning�n efecto. Esto permite que las pol�ticas
pre-instaladas sean sustituidas sin la necesidad de desactivarlas.</p>

<p>Adem�s de reemplazar pol�ticas, redefiniciones pueden alterar un aspecto de
una pol�tica:</p>

<div class="example"><h3>Policy Redefine</h3><pre class="prettyprint lang-config">&lt;SSLPolicyDefine proxy-trust&gt;
   SSLProxyVerify require
&lt;/SSLPolicyDefine&gt;
   ...
&lt;SSLPolicyDefine proxy-trust&gt;
   SSLPolicy proxy-trust
   SSLProxyVerifyDepth 10
&lt;/SSLPolicyDefine&gt;</pre>
</div>

<p>Esto re-utiliza todas las configuraciones de un 'proxy-trust' previo y a�ade
una directiva encima de �l. Todas las dem�s todav�a aplican. Esto es muy �til
cuando las pol�ticas pre-definidas (por Apache mismo o un distribuidor) son
 <em>casi</em> como lo que necesitas. Previamente, tales definiciones fueron
(copiadas y) editadas. Esto hac�a que actualizarlas fuera dificil. Ahora pueden
configurarse as�:</p>

<div class="example"><h3>Ajusta una Pol�tica Pre-Definida</h3><pre class="prettyprint lang-config">Include ssl-policies.conf

&lt;SSLPolicyDefine modern&gt;
   SSLPolicy modern
   SSLProxyVerify none
&lt;/SSLPolicyDefine&gt;</pre>
</div>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslprotocol" id="sslprotocol">Directiva</a> <a name="SSLProtocol" id="SSLProtocol">SSLProtocol</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura versiones de protocolo SSL/TLS utilizables</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProtocol [+|-]<em>protocol</em> ...</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProtocol all -SSLv3</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Se puede usar esta directiva para controlar que versiones del protocolo SSL/TLS
ser�n aceptadas en las nuevas conexiones.</p>
<p>
Los <em>protocolos</em> disponibles (no sensibles a may�sculas) son:</p>
<ul>
<li><code>SSLv3</code>
    <p>
    Este es el protocolo de Secure Sockets Layer (SSL), version 3.0, de la 
    Corporaci�n Netscape. Es el sucesor a SSLv2 y el predecesor de TLSv1, pero
    se ha marcado ya como obsoleto en 
    <a href="http://www.ietf.org/rfc/rfc7568.txt">RFC 7568</a>.</p></li>

<li><code>TLSv1</code>
    <p>
    Este es el protocolo Transport Layer Security (TLS), versi�n 1.0.
    Es el sucesor de SSLv3 y est� definido en
    <a href="http://www.ietf.org/rfc/rfc2246.txt">RFC 2246</a>.
    Est� soportado por casi cualquier cliente.</p></li>

<li><code>TLSv1.1</code> (cuando se usa OpenSSL 1.0.1 y posterior)
    <p>
    Una revisi�n del protocolo TLS 1.0, tal y como se define en
    <a href="http://www.ietf.org/rfc/rfc4346.txt">RFC 4346</a>.</p></li>

<li><code>TLSv1.2</code> (cuando se usa OpenSSL 1.0.1 y posterior)
    <p>
    Una revisi�n del protocolo TLS 1.1, tal y como se define en
    <a href="http://www.ietf.org/rfc/rfc5246.txt">RFC 5246</a>.</p></li>

<li><code>all</code>
    <p>
    Esto es un atajo para ``<code>+SSLv3 +TLSv1</code>'' o
    - cuando se usa OpenSSL 1.0.1 y posterior -
    ``<code>+SSLv3 +TLSv1 +TLSv1.1 +TLSv1.2</code>'', respectivamente
    (excepto para versiones de OpenSSL compiladas con la opci�n de configuraci�n
    ``no-ssl3'', donde <code>all</code> no incluye <code>+SSLv3</code>).
  </p></li>
</ul>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProtocol TLSv1</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycacertificatefile" id="sslproxycacertificatefile">Directiva</a> <a name="SSLProxyCACertificateFile" id="SSLProxyCACertificateFile">SSLProxyCACertificateFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de Certificados CA concatenados codificados en PEM para
la Autenticaci�n Remota del Servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCACertificateFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero <em>todo-en-uno</em> donde ensambla los
Certificados de Autoridades de Certificaci�n (CA) de los <em>servidores 
remotos</em> a los que conecta. Estos se usan como Autenticaci�n de Servidor
Remoto. Tal fichero es simplemente la concatenaci�n de varios ficheros de 
Certificado codificados en PEM en orden de preferencia. Esto se puede usar
alternativamente y/o adicionalmente a
<code class="directive"><a href="#sslproxycacertificatepath">SSLProxyCACertificatePath</a></code>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCACertificateFile "/usr/local/apache2/conf/ssl.crt/ca-bundle-remote-server.crt"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycacertificatepath" id="sslproxycacertificatepath">Directiva</a> <a name="SSLProxyCACertificatePath" id="SSLProxyCACertificatePath">SSLProxyCACertificatePath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de Certificados CA codificados en PEM para la 
Autenticaci�n de Servidor Remoto</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCACertificatePath <em>ruta-al-directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el directorio donde guarda los Certificados de 
Autoridades de Certificaci�n (CAs) de los servidores remotos a los que conecta. 
Estos se usan para verificar el certificado del servidor remoto en la 
Autenticaci�n de Servidor Remoto.</p>

<p>
Los ficheros en este directorio tienen que estar codificados en PEM y se accede
a ellos a trav�s de nombres de ficheros con hash. As� que generalmente no puede
tan s�lo colocar los ficheros de Certificado ah�: tambi�n tiene que crear 
enlaces simb�licos llamados <em>valor-de-hash</em><code>.N</code>. Y deber�a
asegurarse siempre de que este directorio contiene los enlaces s�mb�licos 
apropiados.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCACertificatePath "/usr/local/apache2/conf/ssl.crt/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycarevocationcheck" id="sslproxycarevocationcheck">Directiva</a> <a name="SSLProxyCARevocationCheck" id="SSLProxyCARevocationCheck">SSLProxyCARevocationCheck</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa la comprobaci�n de revocaci�n basada en CRL para la
Autenticaci�n Remota de Servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCARevocationCheck chain|leaf|none</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyCARevocationCheck none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Activa la comprobaci�n de listas de revocaci�n de certificado (CRL) para
los <em>servidores remotos</em> a los que conecta. Al menos una de las directivas
<code class="directive"><a href="#sslproxycarevocationfile">SSLProxyCARevocationFile</a></code>
o <code class="directive"><a href="#sslproxycarevocationpath">SSLProxyCARevocationPath</a></code> debe estar
configurada. Cuando se configura a <code>chain</code> (configuraci�n recomendada),
las comprobaciones de CRL se aplican a todos los certificados en la cadena de
certificaci�n, mientras que configur�ndolo a <code>leaf</code> limita las
comprobaciones al certificado firmado final.
</p>

<div class="note">
<h3>Cuando se configura a <code>chain</code> o <code>leaf</code>,
las CRLs <em>deben</em> estar disponibles para la validaci�n con �xito.</h3>

<p>
Antes de la versi�n 2.4.15, la comprobaci�n de CRL en mod_ssl tambi�n ten�a
�xito cuando no se encontraban CRLs en ninguna de las ubicaciones configuradas 
con <code class="directive"><a href="#sslproxycarevocationfile">SSLProxyCARevocationFile</a></code>
o <code class="directive"><a href="#sslproxycarevocationpath">SSLProxyCARevocationPath</a></code>.
Con la introducci�n de esta directiva, el comportamiento ha cambiado: cuando
la comprobaci�n est� habilitada, las CRLs <em>deben</em> estar presentes para 
que la validaci�n pueda tener �xito - si no fallar� con un error 
<code>"unable to get certificate CRL"</code>.
</p>
</div>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCARevocationCheck chain</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycarevocationfile" id="sslproxycarevocationfile">Directiva</a> <a name="SSLProxyCARevocationFile" id="SSLProxyCARevocationFile">SSLProxyCARevocationFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de CRLs de CA codificados en PEM concatenados para la 
Autenticaci�n Remota de Servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCARevocationFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero <em>todo-en-uno</em> donde puede ensamblar
las Listas de Revocaci�n de Certificados (CRL) de las Autoridades de 
Certificaci�n (CA) de los <em>servidores remotos</em> a los que conecta. Estos
se usan para la Autenticaci�n Remota de Servidor. Tal fichero es simplemente la
concatenaci�n de varios ficheros CRL codificados en PEM, en orden de preferencia.
Esto se puede usar alternativamente a/o adicionalmente a 
<code class="directive"><a href="#sslproxycarevocationpath">SSLProxyCARevocationPath</a></code>.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCARevocationFile "/usr/local/apache2/conf/ssl.crl/ca-bundle-remote-server.crl"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycarevocationpath" id="sslproxycarevocationpath">Directiva</a> <a name="SSLProxyCARevocationPath" id="SSLProxyCARevocationPath">SSLProxyCARevocationPath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de CRLs de CA codificadas en PEM para la Autenticaci�n
Remota de Servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCARevocationPath <em>ruta-al-directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el directorio donde se alojan las Listas de Revocaci�n de
Certificado (CRL) de las Autoridades de Certificaci�n (CA) de los servidores a 
los que conecta. Estas se usan para revocar el certificado del servidor remoto
en la Autenticaci�n del Servidor Remoto.</p>
<p>
Los ficheros en este directorio tienen que ser codificados en PEM y se acceden
con nombres de ficheros con hash. As� que generalmente no s�lo tiene que poner
los ficheros CRL ah�. Tambi�n tiene que crear enlaces simb�licos llamados
<em>valor-de-hash</em><code>.rN</code>. Y siempre deber�a asegurarse de que este
directorio tiene los enlaces simb�licos apropiados.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCARevocationPath "/usr/local/apache2/conf/ssl.crl/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycheckpeercn" id="sslproxycheckpeercn">Directiva</a> <a name="SSLProxyCheckPeerCN" id="SSLProxyCheckPeerCN">SSLProxyCheckPeerCN</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Comprobar el campo CN del certificado del servidor remoto
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCheckPeerCN on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyCheckPeerCN on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura si se debe comparar el campo CN del certificado del 
servidor remoto contra el nombre de host de la URL solicitada. Si ambos no son
iguales se env�a un c�digo de estado 502 (Bad Gateway). 
<code>SSLProxyCheckPeerCN</code> ha sido sustituido por 
<code class="directive"><a href="#sslproxycheckpeername">SSLProxyCheckPeerName</a></code> en la versi�n
2.4.5 y posterior.
</p>

<p>
En todas las versiones desde 2.4.5 hasta 2.4.20, configurar
<code>SSLProxyCheckPeerName off</code> era suficiente para activar este
comportamiento (puesto que el valor por defecto de 
<code>SSLProxyCheckPeerCN</code> era <code>on</code>.) En estas versiones, ambas
directivas deben configurarse a <code>off</code> para evitar completamente que 
se valide el nombre del certificado del servidor remoto. Muchos usuarios 
reportaron que esto es bastante confuso.
</p>

<p>
Desde la versi�n 2.4.21, todas las configuraciones que permiten una de las
opciones <code>SSLProxyCheckPeerName</code> o <code>SSLProxyCheckPeerCN</code>
usar�n el nuevo comportamiento de 
<code class="directive"><a href="#sslproxycheckpeername">SSLProxyCheckPeerName</a></code>, y todas las
configuraciones que deshabilitan una de las opciones de
<code>SSLProxyCheckPeerName</code> o <code>SSLProxyCheckPeerCN</code> 
suprimir�n la validaci�n del nombre del certificado del servidor remoto. s�lo
la siguiente configuraci�n habilitar� la comparaci�n antigua del CN en 2.4.21 y
versiones posteriores;
</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCheckPeerCN on
SSLProxyCheckPeerName off</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycheckpeerexpire" id="sslproxycheckpeerexpire">Directiva</a> <a name="SSLProxyCheckPeerExpire" id="SSLProxyCheckPeerExpire">SSLProxyCheckPeerExpire</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Comprobar si el certificado del servidor remoto est� expirado
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCheckPeerExpire on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyCheckPeerExpire on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura si se debe comprobar si el certificado del servidor
remoto est� expirado o no. Si la comprobaci�n falla se devuelve un error 502 
(Bad Gateway).
</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyCheckPeerExpire on</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxycheckpeername" id="sslproxycheckpeername">Directiva</a> <a name="SSLProxyCheckPeerName" id="SSLProxyCheckPeerName">SSLProxyCheckPeerName</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configure comprobaci�n de nombre de host para certificados de 
  servidor remoto
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCheckPeerName on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyCheckPeerName on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Apache HTTP Server 2.4.5 and later</td></tr>
</table>
<p>
Esta directiva configura la comprobaci�n del nombre de host de certificados de
servidor cuando mod_ssl est� actuando como un cliente SSL. La comprobaci�n 
tendr� �xito si el nombre de host de la petici�n coincide con uno de los 
CN del sujeto del certificado, o coincide con la extensi�n subjectAltName. Si la
comprobaci�n falla, la petici�n SSL se aborta y se devuelve un c�digo de 
estado 502.
</p>

<p>
Se soportan coincidencias con certificados wildcard para casos espec�ficos: una 
entrada subjectAltName del tipo dNSName, o atributos CN que comienzan con 
<code>*.</code> coincidir�n con cualquier nombre de host del mismo n�mero de 
elementos de nombre y el mismo sufijo.
P. ej. <code>*.example.org</code> coincider� con <code>foo.example.org</code>,
pero no coincidir� con <code>foo.bar.example.org</code>, porque el n�mero de 
elementos en el nombre de host respectivo es diferente.
</p>

<p>
Esta caracter�stica fue introducida en 2.4.5 y sustituye el comportamiento de
la directiva <code class="directive"><a href="#sslproxycheckpeercn">SSLProxyCheckPeerCN</a></code>, que
s�lo comprobaba el valor exacto en el primer atributo CN contra el nombre de
host. Sin embargo, muchos usuarios estaban confundidos por el comportamiento de
usar estas directivas individualmente, as� que el comportamiento mutuo de las 
directivas <code>SSLProxyCheckPeerName</code> y <code>SSLProxyCheckPeerCN</code> 
fue mejorado en la versi�n 2.4.21. Vea la descripci�n de la directiva
<code class="directive"><a href="#sslproxycheckpeercn">SSLProxyCheckPeerCN</a></code> para el 
comportamiento original y detalles de estas mejoras.
</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxyciphersuite" id="sslproxyciphersuite">Directiva</a> <a name="SSLProxyCipherSuite" id="SSLProxyCipherSuite">SSLProxyCipherSuite</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Conjunto de Cifrados disponibles para negociaci�n en el saludo SSL
de proxy</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyCipherSuite <em>especificaci�n-de-cifrado</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyCipherSuite ALL:!ADH:RC4+RSA:+HIGH:+MEDIUM:+LOW:+EXP</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>Equivalente a <code class="directive"><a href="#sslciphersuite">SSLCipherSuite</a></code>, pero 
para la conexi�n de proxy.
Por favor consulte <code class="directive"><a href="#sslciphersuite">SSLCipherSuite</a></code>
para informaci�n adicional.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxyengine" id="sslproxyengine">Directiva</a> <a name="SSLProxyEngine" id="SSLProxyEngine">SSLProxyEngine</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Interruptor de Operaci�n del Motor de Proxy SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyEngine on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyEngine off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva activa el uso del motor de protocolo SSL/TLS para proxy. Esto
se usa actualmente dentro de una secci�n 
<code class="directive"><a href="../mod/core.html#virtualhost">&lt;VirtualHost&gt;</a></code> para activar el
uso de proxy con SSL/TLS en un host virtual en particular. Por defecto el Motor
de Protocolo SSL/TLS est� desactivado para tanto el servidor principal como todos
los hosts virtuales.</p>

<p>Tenga en cuenta que la directiva <code class="directive">SSLProxyEngine</code> no 
deber�a en general, ser incluida en un host virtual que actuar� como forward 
proxy (usando las directivas 
<code class="directive"><a href="../mod/mod_proxy.html#proxy">&lt;Proxy&gt;</a></code>
o <code class="directive"><a href="../mod/mod_proxy.html#proxyrequests">ProxyRequests</a></code>).
<code class="directive">SSLProxyEngine</code> no es necesario para activar un servidor
forward proxy para hacer proxy de peticiones SSL/TLS.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">&lt;VirtualHost _default_:443&gt;
    SSLProxyEngine on
    #...
&lt;/VirtualHost&gt;</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxymachinecertificatechainfile" id="sslproxymachinecertificatechainfile">Directiva</a> <a name="SSLProxyMachineCertificateChainFile" id="SSLProxyMachineCertificateChainFile">SSLProxyMachineCertificateChainFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de certificados CA concatenados y codificados en PEM para
ser usados por el proxy para elegir un certificado</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyMachineCertificateChainFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero todo-en-uno donde guarda la cadena de 
certificados para todos los certificados cliente en uso. Esta directiva se 
necesitar� si los servidores remotos presentan una lista de certificados CA
que no son firmantes directos de uno de los certificados cliente configurados.
</p>
<p>
Este fichero es simplemente la concatenciaci�n de varios ficheros de certificado
codificado en PEM. En el arranque, cada certificado cliente configurado ser�
examinado y se construir� una cadena de confianza.
</p>
<div class="warning"><h3>Aviso de Seguridad</h3>
<p>Si se activa esta directiva, se confiar� en todos los certificados en el 
fichero como si tambi�n estuvieran en 
<code class="directive"><a href="#sslproxycacertificatefile">SSLProxyCACertificateFile</a></code>.</p>
</div>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyMachineCertificateChainFile "/usr/local/apache2/conf/ssl.crt/proxyCA.pem"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxymachinecertificatefile" id="sslproxymachinecertificatefile">Directiva</a> <a name="SSLProxyMachineCertificateFile" id="SSLProxyMachineCertificateFile">SSLProxyMachineCertificateFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fichero de certificados cliente codificados en PEM y claves para
ser usadas por el proxy</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyMachineCertificateFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el fichero todo-en-uno donde guarda los certificados y
claves usadas para la autenticaci�n del servidor proxy en servidores remotos.
</p>
<p>
Este fichero es simplemente la concatenaci�n de varios ficheros de certificado
codificados en PEM, en orden de preferencia. Use esta directiva alternativamente
o adicionalmente a <code>SSLProxyMachineCertificatePath</code>.
</p>
<div class="warning">
<p>Actualmente no hay soporte para claves privadas encriptadas</p>
</div>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyMachineCertificateFile "/usr/local/apache2/conf/ssl.crt/proxy.pem"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxymachinecertificatepath" id="sslproxymachinecertificatepath">Directiva</a> <a name="SSLProxyMachineCertificatePath" id="SSLProxyMachineCertificatePath">SSLProxyMachineCertificatePath</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Directorio de certificados cliente codificados en PEM y claves
  para ser usadas por el proxy</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyMachineCertificatePath <em>directorio</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el directorio donde se guardan los certificados y claves
usadas para la autenticaci�n del servidor proxy en servidores remotos.
</p>

<p>Los ficheros en este directorio deben ser codificados en PEM y accesibles
con nombres de ficheros con hash. Adem�s, debe crear enlaces simb�licos 
llamados <code><em>valor-del-hash</em>.N</code>. Y siempre deber�a asegurarse
de que este directorio contiene los enlaces simb�licos apropiados.</p>
<div class="warning">
<p>Actualmente no hay soporte para claves privadas encriptadas</p>
</div>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyMachineCertificatePath "/usr/local/apache2/conf/proxy.crt/"</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxypolicy" id="sslproxypolicy">Directiva</a> <a name="SSLProxyPolicy" id="SSLProxyPolicy">SSLProxyPolicy</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Aplica directivas de tipo SSLProxy* en una SSLPolicy</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyPolicy <em>nombre</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.30 y posterior</td></tr>
</table>
<p>Esta directiva es similar a <code class="directive">SSLPolicy</code>, pero aplica
s�lo a directivas de SSLProxy* definidas en la pol�tica. Esto ayuda cuando 
necesita distintas pol�ticas para los clientes y los backends:</p>

<div class="example"><h3>Otras Pol�ticas s�lo para Proxy</h3><pre class="prettyprint lang-config">SSLPolicy modern
SSLProxyPolicy intermediate</pre>
</div>

<p>En este ejemplo, la pol�tica 'modern' se aplica a los clientes y backends.
Entonces a las partes de los backend se sobreescriben con las configuraciones
de pol�ticas de 'intermediate'.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxyprotocol" id="sslproxyprotocol">Directiva</a> <a name="SSLProxyProtocol" id="SSLProxyProtocol">SSLProxyProtocol</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configure sabores de protocolo SSL utilizables para uso de 
  proxy</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyProtocol [+|-]<em>protocolo</em> ...</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyProtocol all -SSLv3</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>

<p>
Esta directiva puede usarse para controlar los sabores de protocolo SSL que
mod_ssl deber�a usar cuando establece si entorno de servidor para proxy. s�lo
conectar� con servidores usando uno de sus protocolos facilitados.</p>
<p>Por favor vea <code class="directive"><a href="#sslprotocol">SSLProtocol</a></code> para 
informaci�n adicional.
</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxyverify" id="sslproxyverify">Directiva</a> <a name="SSLProxyVerify" id="SSLProxyVerify">SSLProxyVerify</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tipo de verficaci�n de certificado del servidor remoto</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyVerify <em>level</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyVerify none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>

<p>Cuando se configura un proxy para enviar peticiones a un servidor remoto SSL,
esta directiva se puede usar para configurar verificaci�n de certificado del
servidor remoto.</p>

<p>
Los siguientes niveles est�n disponibles para <em>nivel</em>:</p>
<ul>
<li><strong>none</strong>:
     No se requiere Certificado del servidor remoto para nada</li>
<li><strong>optional</strong>:
     el servidor remoto <em>puede</em> presentar un Certificado v�lido</li>
<li><strong>require</strong>:
     el servidor remoto <em>tiene que</em> presenta un Certificado v�lido</li>
<li><strong>optional_no_ca</strong>:
     el servidor remoto puede presentar un Certificado v�lido<br />
     pero no tiene por qu� ser verificable (con �xito).</li>
</ul>
<p>En la pr�ctica s�lo los niveles <strong>none</strong> y
<strong>require</strong> son realmente interesantes, porque el nivel 
<strong>optional</strong> no funciona en todos los servidores y el nivel
<strong>optional_no_ca</strong> va actualmente contra la idea de autenticaci�n
(pero se puede usar para establecer p�ginas de test SSL, etc.)</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyVerify require</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslproxyverifydepth" id="sslproxyverifydepth">Directiva</a> <a name="SSLProxyVerifyDepth" id="SSLProxyVerifyDepth">SSLProxyVerifyDepth</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>M�xima profundidad de los Certificados CA en la verificaci�n del
Certificado en el Servidor Remoto</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLProxyVerifyDepth <em>number</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLProxyVerifyDepth 1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, secci�n de proxy</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura hasta d�nde mod_ssl deber�a verificar antes de decidir
que el servidor remoto not tiene un certificado v�lido.</p>

<p>
La profundidad actualmente es el n�mero m�ximo de expedidores intermedios de 
certificados, p. ej. el n�mero de certificados CA que se permiten seguir como 
m�ximo para verificar el certificado del servidor remoto. Una profundidad de 0
sigifnica que s�lo se permiten certificados auto-firmados, la profundidad por
defecto de 1 significa que el servidor remoto puede ser autofirmado o fimado por 
una CA que es directamente conocida por el servidor (p. ej. el certificado CA
bajo <code class="directive"><a href="#sslproxycacertificatepath">SSLProxyCACertificatePath</a></code>), 
etc.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLProxyVerifyDepth 10</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslrandomseed" id="sslrandomseed">Directiva</a> <a name="SSLRandomSeed" id="SSLRandomSeed">SSLRandomSeed</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Fuente de generaci�n de semilla pseudoaleatoria de n�meros 
  (PRNG)</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLRandomSeed <em>contexto</em> <em>fuente</em>
[<em>bytes</em>]</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
  <p>
  Esto configura una o m�s fuentes de generaci�n de semilla pseudoaleatoria de 
  n�meros "Pseudo Random Number Generator (PRNG)" en OpenSSL en el arranque 
  (<em>contexto</em> es <code>startup</code>) y/o justo antes de que se 
  establezca una nueva conexi�n SSL
  (<em>contexto</em> es <code>connect</code>). Esta directiva s�lo se puede usar
  en el contexto global de configuraci�n del servidor porque PRNG es una
  caracter�stica global.</p>
  <p>
  Las siguientes variante de <em>fuente</em> est�n disponibles:</p>
  <ul>
  <li><code>builtin</code>
    <p>Esta es siempre la fuente de generaci�n de semilla que est� siempre 
    disponible. Usa el m�nimo de ciclos de CPU en tiempo real as� que se puede
    usar siempre sin contratiempos. La fuente utilizada para la generaci�n de
    semilla de PRNG contiene la hora actual, el id de proceso actual y 
    (cuando es aplicable) un extracto de 1KB escogido aleatoriamente de la
    estructura de scoreboard de Apache. La pega es que no es realmente una 
    fuente muy compleja y en el momento del arranque (cuando el scoreboard 
    todav�a no est� disponible) esta fuente s�lo produce unos pocos bytes de 
    entrop�a. As� que usted deber�a, al menos en el arranque, usar una fuente
    adicional de generaci�n de semilla.</p></li>

    <li><code>file:/ruta/hacia/la/fuente</code>
    <p>
    Esta variante usa un fichero externo <code>/ruta/hacia/la/fuente</code> con
    la fuente de generaci�n de semilla para PRNG. Cuando se especifica 
    <em>bytes</em>, s�lo los primeros <em>bytes</em> del n�mero de bytes del 
    fichero forman la entrop�a (y <em>bytes</em> se da a 
    <code>/ruta/hacia/la/fuente</code> como el primer par�metro). Cuando
    no se especifica <em>bytes</em> el fichero al completo forma la entrop�a
    (y <code>0</code> se da a <code>/ruta/hacia/la/fuente</code> como primer
    par�metro). Use esto especialmente en el arranque, por ejemplo con 
    dispositivos disponibles <code>/dev/random</code> y/o
    <code>/dev/urandom</code> (que generalmente existen en derivados de Unix
    modernos como FreeBSD y Linux).</p>
    <p>
    <em>Pero tenga cuidado</em>: Generalmente <code>/dev/random</code> facilita
    s�lo tantos datos de entrop�a como tiene en ese momento, p.ej. cuando solicita
    512 bytes de entrop�a, pero el dispositivo s�lo tiene 100 bytes disponibles
    dos cosas pasan: En algunas plataformas recibe s�lo 100 bytes mientras que 
    en otras plataformas la lectura se bloquea hasta que hay suficientes bytes 
    disponibles (lo cual puede llevar bastante tiempo). Aqu� usar un
    <code>/dev/urandom</code> existente es mejor, porque nunca bloquea y porque
    facilita la cantidad de datos solicitada. La pega es que la calidad de los 
    datos recibidos puede que no sea la mejor.</p></li>

<li><code>exec:/ruta/al/programa</code>
    <p>
    Esta variante usa un ejecutable externo
    <code>/ruta/al/programa</code> como la fuente de generaci�n de semilla de
    PRNG. Cuando se especifica <em>bytes</em>, s�lo los primeros
    <em>bytes</em> del n�mero de bytes de su contenido de <code>stdout</code> 
    forman la entrop�a. Cuando no se especifica <em>bytes</em>, el total de los
    datos producidos en <code>stdout</code> forman la entrop�a. Use esto s�lo
    en el tiempo de arranque cuando necesita una generaci�n de semilla muy 
    compleja con la ayuda de un programa externo (como en el
    ejemplo de m�s arriba con la utilidad <code>truerand</code> que puede
    encontrar en la distribuci�n de mod_ssl que est� basada en la librer�a 
    <em>truerand</em> de  AT&amp;T). Usar esto en contexto de conexi�n
    ralentiza al servidor de manera dram�tica, por supuesto. As� que deber�a 
    evitar programas externos en ese contexto. </p></li>

<li><code>egd:/ruta/al/egd-socket</code> (S�lo Unix)
    <p>
    Esta variante usa el socket de dominio Unix del Demonio de Recolecci�n de 
    Entrop�a externo (Entropy Gathering Daemon (EGD)) (vea <a href="http://www.lothar.com/tech/crypto/">http://www.lothar.com/tech
    /crypto/</a>) para generar semilla de PRNG. Use esto si no hay un 
    dispositivo de generaci�n de datos aleatorios en su sistema.</p></li>
</ul>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLRandomSeed startup builtin
SSLRandomSeed startup "file:/dev/random"
SSLRandomSeed startup "file:/dev/urandom" 1024
SSLRandomSeed startup "exec:/usr/local/bin/truerand" 16
SSLRandomSeed connect builtin
SSLRandomSeed connect "file:/dev/random"
SSLRandomSeed connect "file:/dev/urandom" 1024</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslrenegbuffersize" id="sslrenegbuffersize">Directiva</a> <a name="SSLRenegBufferSize" id="SSLRenegBufferSize">SSLRenegBufferSize</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configure el tama�o para el b�fer de renegociaci�n 
  SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLRenegBufferSize <var>bytes</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLRenegBufferSize 131072</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>

<p>Si se requiere una renegociaci�n SSL por el contexto location, por ejemplo,
cualquier uso de <code class="directive"><a href="#sslverifyclient">SSLVerifyClient</a></code> en un
bloque Directory o Location, entonces <code class="module"><a href="../mod/mod_ssl.html">mod_ssl</a></code> debe hacer b�fer
del cuerpo de la petici�n HTTP en memoria hasta que el nuevo saludo SSL
puede realizarse. Esta directiva se puede usar para especificar la cantidad
de memoria que se usar� para este b�fer.</p>

<div class="warning"><p>
Tenga en cuenta que en muchas configuraciones, el cliente enviando el cuerpo de 
la petici�n no es confiable as� que se debe considerar un ataque de denegaci�n
de servicio por consumo de memoria cuando se cambie este valor de 
configuraci�n.
</p></div>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLRenegBufferSize 262144</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslrequire" id="sslrequire">Directiva</a> <a name="SSLRequire" id="SSLRequire">SSLRequire</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Permite acceso s�lo cuando una compleja expresi�n booleana 
  arbitrar�a es cierta</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLRequire <em>expresi�n</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>

<div class="note"><h3>SSLRequire est� obsoleta</h3>
<p><code>SSLRequire</code> est� obsoleta y deber�a en general ser sustituida por
<a href="mod_authz_core.html#reqexpr">Require expr</a>. La tal llamada 
sintaxis de <a href="../expr.html">ap_expr</a> en <code>Require expr</code> es
la sustituci�n de la sintaxis de <code>SSLRequire</code>, con la siguiente
excepci�n:</p>

<p>En <code>SSLRequire</code>, los operadores de comparaci�n <code>&lt;</code>,
<code>&lt;=</code>, ... son equivalentes completamente a los operadores
<code>lt</code>, <code>le</code>, ... y funionan de una manera un tanto peculiar
que primero compara la longitud de dos cadenas de caracteres y despu�s el orden
l�xico. Por otro lado, <a href="../expr.html">ap_expr</a> tiene dos conjuntos
de operadores de comparaci�n: Los operadores <code>&lt;</code>,
<code>&lt;=</code>, ... hacen compraciones l�xicas de cadenas de caracteres, 
mientras que los operadores <code>-lt</code>, <code>-le</code>, ... hacen
comparaci�n de n�meros integrales.
Para los �ltimos, tambi�n hay aliases sin el gui�n inicial:
<code>lt</code>, <code>le</code>, ...
</p>
</div>

<p>
Esta directiva especifica un requerimiento de acceso general que tiene
que pasarse para que se permita el acceso. Es una directiva muy vers�til porque
la especificaci�n del requerimiento es una compleja expresi�n booleana arbitraria
que contiene cualquier n�mero de comprobaciones.</p>
<p>

La <em>expresi�n</em> debe coincidir en la siguiente sintaxis (dada una notaci�n
gramatical BNF):</p>
<blockquote>
<pre>expr     ::= "<strong>true</strong>" | "<strong>false</strong>"
           | "<strong>!</strong>" expr
           | expr "<strong>&amp;&amp;</strong>" expr
           | expr "<strong>||</strong>" expr
           | "<strong>(</strong>" expr "<strong>)</strong>"
           | comp

comp     ::= word "<strong>==</strong>" word | word "<strong>eq</strong>" word
           | word "<strong>!=</strong>" word | word "<strong>ne</strong>" word
           | word "<strong>&lt;</strong>"  word | word "<strong>lt</strong>" word
           | word "<strong>&lt;=</strong>" word | word "<strong>le</strong>" word
           | word "<strong>&gt;</strong>"  word | word "<strong>gt</strong>" word
           | word "<strong>&gt;=</strong>" word | word "<strong>ge</strong>" word
           | word "<strong>in</strong>" "<strong>{</strong>" wordlist "<strong>}</strong>"
           | word "<strong>in</strong>" "<strong>PeerExtList(</strong>" word "<strong>)</strong>"
           | word "<strong>=~</strong>" regex
           | word "<strong>!~</strong>" regex

wordlist ::= word
           | wordlist "<strong>,</strong>" word

word     ::= digit
           | cstring
           | variable
           | function

digit    ::= [0-9]+
cstring  ::= "..."
variable ::= "<strong>%{</strong>" varname "<strong>}</strong>"
function ::= funcname "<strong>(</strong>" funcargs "<strong>)</strong>"</pre>
</blockquote>

<p>Para <code>varname</code> se puede usar cualquiera de las variables descritas 
en <a href="#envvars">Variables de Entorno</a>.  Para
<code>funcname</code> las funciones disponibles est�n listadas en la
<a href="../expr.html#functions">documentaci�n de ap_expr</a>.</p>

<p>La <em>expresi�n</em> es interpretada dentro de una representaci�n interna 
de m�quina cuando se carga la configuraci�n, y es despu�s evaluada durante 
el procesamiento de la petici�n. En contexto .htaccess, la <em>expresi�n</em> es
en ambos casos interpretada y ejecutada cada vez que se encuentra un fichero
.htaccess durante el procesamiento de la petici�n.</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLRequire (    %{SSL_CIPHER} !~ m/^(EXP|NULL)-/                   \
            and %{SSL_CLIENT_S_DN_O} eq "Snake Oil, Ltd."          \
            and %{SSL_CLIENT_S_DN_OU} in {"Staff", "CA", "Dev"}    \
            and %{TIME_WDAY} -ge 1 and %{TIME_WDAY} -le 5          \
            and %{TIME_HOUR} -ge 8 and %{TIME_HOUR} -le 20       ) \
           or %{REMOTE_ADDR} =~ m/^192\.76\.162\.[0-9]+$/</pre>
</div>

<p>La funci�n <code>PeerExtList(<em>object-ID</em>)</code> espera encontrar
cero o m�s instancias de la extensi�n de certificado X.509 identificadas por
un <em>ID de objecto</em> (OID) dado en el certificado cliente. La expresi�n
se eval�a a cierta si la cadena de caracteres de la izquierda coincide 
exactamente contra el valor de la extensi�n identificada por este OID. (Si est�n
presentes m�ltiples extensiones con el mismo OID, al menos uno debe 
coincidir).</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLRequire "foobar" in PeerExtList("1.2.3.4.5.6")</pre>
</div>

<div class="note"><h3>Notas sobre la funci�n PeerExtList</h3>

<ul>

<li><p>El ID de objeto puede ser especificado o bien como un 
nombre descriptivo reconocido por la librer�a SSL, tal como 
<code>"nsComment"</code>, o como un OID num�rico, tal como
 <code>"1.2.3.4.5.6"</code>.</p></li>

<li><p>Expresiones con tipos conocidos para la librer�a SSL se expresan como una 
cadena de caracteres antes de su comparaci�n. Para una extensi�n con un tipo no
reconocido por la librer�a SSL, mod_ssl interpretar� el valor si es uno de los
tipos primitivos ASN.1 types UTF8String, IA5String, VisibleString,
o BMPString.  Para una extensi�n de uno de estos tipos, el valor de la cadena
de caracteres se convertir� en UTF-8 si es necesario, y entonces comparada 
contra la expresi�n de la izquierda.</p></li>

</ul>
</div>


<h3>Consulte tambi�n</h3>
<ul>
<li><a href="../env.html">Variables de entorno en el Servidor HTTP 
  Apache</a>, para m�s ejemplos.
</li>
<li><a href="mod_authz_core.html#reqexpr">Require expr</a></li>
<li><a href="../expr.html">Sintaxis general de expresi�n en el Servidor
HTTP Apache</a>
</li>
</ul>
</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslrequiressl" id="sslrequiressl">Directiva</a> <a name="SSLRequireSSL" id="SSLRequireSSL">SSLRequireSSL</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Denegar el acceso cuando no se usa SSL para la petici�n 
  HTTP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLRequireSSL</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva prohibe el acceso a menos que est� habilitado HTTP sobre SSL
(p. ej. HTTPS) para la conexi�n en cuesti�n. Esto es muy �til dentro de
hosts virtuales con SSL activado o directorios, para defenderse de errores
de configuraci�n que exponen cosas que deber�an estar protegidas. Cuando esta 
directiva est� presente todas las peticiones que no usen SSL son denegadas.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLRequireSSL</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsessioncache" id="sslsessioncache">Directiva</a> <a name="SSLSessionCache" id="SSLSessionCache">SSLSessionCache</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tipo de la Cach� global/interproceso de la sesi�n SSL</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSessionCache <em>tipo</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLSessionCache none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esto configura el tipo de almacenamiento para la Cache global/interproceso de 
la sesi�n SSL. Esta cache es una caracter�stica opcional que acelera el 
processamiento de peticiones en paralelo. Para peticiones con el mismo
proceso de servidor (a trav�s de keep-alive HTTP), OpenSSL ya cachea la 
informaci�n de sesi�n de SSL localmente. Pero puesto que los clientes modernos
solicitan im�genes y otros datos a trav�s de peticiones en paralelo 
(generalmente hasta cuatro peticiones en paralelo es lo t�pico) esas peticiones 
se sirven por procesos de servidor <em>diferentes</em>. Aqu� la cache de
inter-proceso ayuda para evitar saludos de sesi�n SSL innecesarios.</p>
<p>

Los cinto <em>tipos</em> de almacenamientos siguientes est�n soportados:</p>
<ul>
<li><code>none</code>

    <p>Esto desactiva la Cache de Sesi�n de interproceso/global. Esto 
    repercutir� en un descenso de la velocidad notable y puede causar problemas
    con ciertos navegadores, particularmente si est�n activados los certificados
    cliente. Esta configuraci�n no se recomienda.</p></li>

<li><code>nonenotnull</code>

    <p>Esto s�lo desactiva la Cache de Sesi�n de interproceso/global. Aun as� no
    fuerza a OpenSSL a enviar ID de sesi�n no-nula para adaptarse a clientes
    que requieren una.</p></li>

<li><code>dbm:/ruta/al/ficherodedatos</code>

    <p>Esto hace uso del fichero de hash DBM en el disco local para sincronizar 
    las caches de memoria del OpenSSL de los procesos del servidor. Esta cach� 
    de sesi�n puede tener problemas de fiabilidad cuando hay carga alta. Para
    usarla, aseg�rese de que 
    <code class="module"><a href="../mod/mod_socache_dbm.html">mod_socache_dbm</a></code> est� cargado.</p></li>

<li><code>shmcb:/ruta/al/ficherodedatos</code>[<code>(</code><em>tama�o</em><code>)</code>]

    <p>Esto hace uso del b�fer c�clico de alto rendimiento
    (approx. <em>tama�o</em> bytes de tama�o) dentro de un segmento de memoria
    compartida en RAM (establecida con <code>/ruta/al/ficherodedatos</code>) 
    para sincronizar las caches de memoria del OpenSSL local de los procesos del
    servidor. Esta es la cach� de sesi�n recomendada. Para usarla, aseg�rese de 
    que <code class="module"><a href="../mod/mod_socache_shmcb.html">mod_socache_shmcb</a></code> est� cargado.</p></li>

<li><code>dc:UNIX:/ruta/al/socket</code>

    <p>Esto hace uso de las librerias de cacheo <a href="http://distcache.sourceforge.net/">distcache</a>. El par�metro deber�a
    especificar la ubicaci�n del servidor o proxy para ser usado con distcache 
    usando sintaxis de direcci�n; por ejemplo, 
    <code>UNIX:/ruta/al/socket</code> especifica un socket de dominio UNIX
    (t�picamente un proxy dc_client local);
    <code>IP:server.example.com:9001</code> especifica una direcci�n IP. Para
    usar esto, aseg�rese de que <code class="module"><a href="../mod/mod_socache_dc.html">mod_socache_dc</a></code> est� 
    cargado.</p></li>

</ul>

<div class="example"><h3>Ejemplos</h3><pre class="prettyprint lang-config">SSLSessionCache "dbm:/usr/local/apache/logs/ssl_gcache_data"
SSLSessionCache "shmcb:/usr/local/apache/logs/ssl_gcache_data(512000)"</pre>
</div>

<p>El mutex <code>ssl-cache</code> se usa para serializar el acceso a la cache 
de sesi�n para prevenir corrupci�n. Este mutex puede configurarse usando la 
directiva <code class="directive"><a href="../mod/core.html#mutex">Mutex</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsessioncachetimeout" id="sslsessioncachetimeout">Directiva</a> <a name="SSLSessionCacheTimeout" id="SSLSessionCacheTimeout">SSLSessionCacheTimeout</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de segundos antes de que la sesi�n SSL expira 
  en la Cache de Sesi�n</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSessionCacheTimeout <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLSessionCacheTimeout 300</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Aplica tambi�n al RFC 5077 de reanudaci�n de sesi�n en
  Apache 2.4.10 o posterior</td></tr>
</table>
<p>
Esta directiva configura el tiemplo l�mite en segundos para la informaci�n 
guardada en  la cach� de sesi�n SSL de interproceso/global, la cach� de memoria 
interna de OpenSSL y para las sesiones reanudadas por la reanudaci�n de sesi�n 
de TLS (RFC 5077). Puede ponerse hasta un m�nimo de 15 para hacer pruebas, pero 
deber�a configurarse con valores como 300 en entornos funcionales.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLSessionCacheTimeout 600</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsessionticketkeyfile" id="sslsessionticketkeyfile">Directiva</a> <a name="SSLSessionTicketKeyFile" id="SSLSessionTicketKeyFile">SSLSessionTicketKeyFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Clave persistente de encriptaci�n/desencriptaci�n para ticket de
sesi�n TLS</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSessionTicketKeyFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.0 y posterior, si se usaOpenSSL 0.9.8h o
posterior</td></tr>
</table>
<p>Opcionalmente configura una clave secreta para la encriptaci�n y 
desencriptaci�n de tickets de sesi�n TLS, tal y como se define en 
<a href="http://www.ietf.org/rfc/rfc5077.txt">RFC 5077</a>. Principalmente
adecuado para entornos clusterizados donde la informaci�n de sesiones TLS
deber�a ser compartida entre varios nodos. Para configuraciones de una sola
instancia http, es recomendable <em>no</em> configurar un fichero clave
de ticket, pero si depender de varias claves generadas (al azar) por mod_ssl 
en el arranque, en su lugar.</p>
<p>El fichero clave de ticket debe contener 48 bytes de datos aleatorios, 
preferiblemente credos de una fuente con alta entrop�a. En un sistema basado en
Unix, un fichero clave de ticket puede generarse como sigue:</p>

<div class="example"><p><code>
dd if=/dev/random of=/path/to/file.tkey bs=1 count=48
</code></p></div>

<p>Las claves de ticket deber�an rotarse (sustituirse) frecuentemente, puesto
que esta es la �nica forma de invalidar sesiones de ticket existentes - Openssl 
actualmente no permite especificar un tiempo l�mite de validez de tickets. Una 
nueva clave de ticket s�lo se usa despu�s de reiniciar el servidor web.
Todas las sesiones de tickets existentes son inv�lidas despu�s de un 
reinicio.</p>

<div class="warning">
<p>El fichero clave de ticket contiene material sensible de claves y deber�a
protegerse con permisos de fichero de una manera similar a las que se deben
usar para los ficheros utilizados con
<code class="directive"><a href="#sslcertificatekeyfile">SSLCertificateKeyFile</a></code>.</p>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsessiontickets" id="sslsessiontickets">Directiva</a> <a name="SSLSessionTickets" id="SSLSessionTickets">SSLSessionTickets</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa o desactiva el uso de tickets de sesi�n TLS</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSessionTickets on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLSessionTickets on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.11 y posterior, si se usa OpenSSL 0.9.8f
o posterior.</td></tr>
</table>
<p>Esta directiva permite activar o desactivar el uso de los tickets de sesi�n
TLS (RFC 5077).</p>
<div class="warning">
<p>Los tickets de sesi�n TLS se activan por defecto. Usarlos sin reiniciar el
servidor web con una frecuencia apropiada (p. ej. diariamente) compromete
un "forward secrecy" perfecto</p>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsrpunknownuserseed" id="sslsrpunknownuserseed">Directiva</a> <a name="SSLSRPUnknownUserSeed" id="SSLSRPUnknownUserSeed">SSLSRPUnknownUserSeed</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Semilla de usuario desconocido SRP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSRPUnknownUserSeed <em>cadenadecaracteres-secreta</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.4 y posterior si se usa OpenSSL 1.0.1 o
posterior</td></tr>
</table>
<p>
Esta directiva configura la semilla usada para aparentar par�metros de usuario 
SRP para usuarios desconocidos, para evitar dar a conocer si el usuario 
facilitado existe, se especifica una cadena de caracteres secreta. Si no se usa 
esta directiva, entonces Apache deolver� la alerta UNKNOWN_PSK_IDENTITY a 
clientes que espcifican un nombre de usuario desconocido.
</p>
<div class="example"><h3>Ejemplo</h3><p><code>
SSLSRPUnknownUserSeed "secret"
</code></p></div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslsrpverifierfile" id="sslsrpverifierfile">Directiva</a> <a name="SSLSRPVerifierFile" id="SSLSRPVerifierFile">SSLSRPVerifierFile</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Ruta hacia el fichero verificador SRP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLSRPVerifierFile <em>ruta-al-fichero</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en httpd 2.4.4 y posterior si se usa OpenSSL 1.0.1 o
posterior</td></tr>
</table>
<p>
Esta directiva activa TLS-SRP y configura la ruta al fichero verificador 
OpenSSL SRP (Secure Remote Password) que contiene nombres de usuario, 
verificadores, salts y par�metros de grupo TLS-SRP.</p>
<div class="example"><h3>Ejemplo</h3><p><code>
SSLSRPVerifierFile "/ruta/al/fichero.srpv"
</code></p></div>

<p>
El fichero verificador puede generarse con la utilidad de l�nea de comandos
<code>openssl</code>:</p>

<div class="example"><h3>Creando el fichero verificador SRP</h3><p><code>
openssl srp -srpvfile passwd.srpv -userinfo "some info" -add username
</code></p></div>

<p> El valor dado con el par�metro opcional <code>-userinfo</code> est� 
disponible en la variable de entorno de petici�n 
<code>SSL_SRP_USERINFO</code>.</p>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingcache" id="sslstaplingcache">Directiva</a> <a name="SSLStaplingCache" id="SSLStaplingCache">SSLStaplingCache</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Configura la cache del stapling de OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingCache <em>tipo</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Configura la cache utilizada para almacenar las respuestas OCSP que se 
incluyen en el saludo TLS si 
<code class="directive"><a href="#sslusestapling">SSLUseStapling</a></code> est� activada. La 
coniguraci�n de la cache es obligatoria para el stapling the OCSP. Con la
excepci�n de <code>none</code> y <code>nonenotnull</code>, se da soporte a
los mismos tipos de almacenamiento que con 
<code class="directive"><a href="#sslsessioncache">SSLSessionCache</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingerrorcachetimeout" id="sslstaplingerrorcachetimeout">Directiva</a> <a name="SSLStaplingErrorCacheTimeout" id="SSLStaplingErrorCacheTimeout">SSLStaplingErrorCacheTimeout</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de segundos antes de expirar respuestas inv�lidas en la 
cache del stapling de OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingErrorCacheTimeout <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingErrorCacheTimeout 600</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Configura el tiempo l�mite en segundos antes de que las respuestas 
<em>inv�lidas</em> en la cache de stapling OCSP (configuradas con 
<code class="directive"><a href="#sslstaplingcache">SSLStaplingCache</a></code>) expiren. Para 
configurar el tiempo l�mite de respuestas v�lidas, vea
<code class="directive"><a href="#sslstaplingstandardcachetimeout">SSLStaplingStandardCacheTimeout</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingfaketrylater" id="sslstaplingfaketrylater">Directiva</a> <a name="SSLStaplingFakeTryLater" id="SSLStaplingFakeTryLater">SSLStaplingFakeTryLater</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Sintetiza respuestas "tryLater" para consultas fallidas de stapling
de OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingFakeTryLater on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingFakeTryLater on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Cuando se activa y una consulta de stapling a un respondedor OCSP falla, 
mod_ssl sintetizar� una respuesta "tryLater" para el cliente. s�lo efectiva si
<code class="directive"><a href="#sslstaplingreturnrespondererrors">SSLStaplingReturnResponderErrors</a></code> 
tambi�n est� activada.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingforceurl" id="sslstaplingforceurl">Directiva</a> <a name="SSLStaplingForceURL" id="SSLStaplingForceURL">SSLStaplingForceURL</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Sobreescribe la URI especificada por el respondedor OCSP 
  especificada en la extensi�n AIA del certificado</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingForceURL <em>uri</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Esta directiva sobreescribe la URI de un respondedor OCSP obtenida de la 
extensi�n authorityInfoAccess (AIA) del certificado.
Un uso potencial puede ser cuando se usa un proxy para hacer consultas OCSP.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingrespondertimeout" id="sslstaplingrespondertimeout">Directiva</a> <a name="SSLStaplingResponderTimeout" id="SSLStaplingResponderTimeout">SSLStaplingResponderTimeout</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tiempo m�ximo para las consultas de stapling de OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingResponderTimeout <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingResponderTimeout 10</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Esta opci�n configura el tiempo m�ximo para consultas a respondedores OCSP
cuando <code class="directive"><a href="#sslusestapling">SSLUseStapling</a></code> est� activada y 
mod_ssl est� consultando a un respondedor por motivos de stapling de OCSP.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingresponsemaxage" id="sslstaplingresponsemaxage">Directiva</a> <a name="SSLStaplingResponseMaxAge" id="SSLStaplingResponseMaxAge">SSLStaplingResponseMaxAge</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Edad m�xima permitida para respuesta de stapling OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingResponseMaxAge <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingResponseMaxAge -1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Esta opci�n configura la edad m�xima permitida ("frescura") cuando se 
consideran las respuestas OCSP para stapling, p. ej. cuando
<code class="directive"><a href="#sslusestapling">SSLUseStapling</a></code> est� activada.
El valor por defecto (<code>-1</code>) no fuerza una edad m�xima, lo que 
significa que las respuestas OCSP se consideran v�lidas mientras el valor del
campo <code>nextUpdate</code> est� en una fecha futura.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingresponsetimeskew" id="sslstaplingresponsetimeskew">Directiva</a> <a name="SSLStaplingResponseTimeSkew" id="SSLStaplingResponseTimeSkew">SSLStaplingResponseTimeSkew</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tiempo m�ximo permitido para la validaci�n del stapling 
  OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingResponseTimeSkew <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingResponseTimeSkew 300</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Esta opci�n configura el tiempo m�ximo de desviaci�n cuando mod_ssl comprueba 
los campos <code>thisUpdate</code> y <code>nextUpdate</code> de las respuestas
OCSP que se incluyen en el saludo TLS (Stapling de OCSP). s�lo aplicable si
<code class="directive"><a href="#sslusestapling">SSLUseStapling</a></code> est� activada.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingreturnrespondererrors" id="sslstaplingreturnrespondererrors">Directiva</a> <a name="SSLStaplingReturnResponderErrors" id="SSLStaplingReturnResponderErrors">SSLStaplingReturnResponderErrors</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Pasa los errores relacionados con stapling de OCSP al cliente
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingReturnResponderErrors on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingReturnResponderErrors on</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Cuando se activa, mod_ssl pasar� las respuestas de consultas sin �xito 
relacionadas con el stapling OCSP (tales como respuestas con un estado general
que no sea otro que "con �xito", respuestas con un estado de certificado que no
sea otro que "bueno", respuestas de expirado, etc.) al cliente.
Si la configura a <code>off</code>, s�lo respuestas indicando un estado de 
certificado "bueno" se incluir�n en el saludo TLS.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstaplingstandardcachetimeout" id="sslstaplingstandardcachetimeout">Directiva</a> <a name="SSLStaplingStandardCacheTimeout" id="SSLStaplingStandardCacheTimeout">SSLStaplingStandardCacheTimeout</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>N�mero de segundos antes de expirar las respuestas en la cache del
stapling de OCSP</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStaplingStandardCacheTimeout <em>segundos</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStaplingStandardCacheTimeout 3600</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Configura el l�mite de tiempo en segundos antes de que las respuestas en el 
cache de stapling de OCSP (configuradas con 
<code class="directive"><a href="#sslstaplingcache">SSLStaplingCache</a></code>) expiren. Esta 
directiva aplica a respuestas <em>v�lidas</em>, mientras que
<code class="directive"><a href="#sslstaplingerrorcachetimeout">SSLStaplingErrorCacheTimeout</a></code> se
usa para controlar el l�mite de tiempo para respuestas inv�lidas/indisponibles.
</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslstrictsnivhostcheck" id="sslstrictsnivhostcheck">Directiva</a> <a name="SSLStrictSNIVHostCheck" id="SSLStrictSNIVHostCheck">SSLStrictSNIVHostCheck</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Permitir o no a clientes no-SNI acceder a host virtuales basados
  en nombre.
</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLStrictSNIVHostCheck on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLStrictSNIVHostCheck off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura si un cliente no-SNI tiene permiso para acceder a un 
host virtual basado en nombre. Si se configura a <code>on</code> en el host
virtual por defecto basado en nombre, los clientes que no son compatibles con
SNI no se les permitir� el acceso a <em>ning�n</em> host virtual que pertenezca
a esta combinaci�n de ip/puerto. Si se configura a <code>on</code> en cualquier
otro host virtual, los clientes no compatibles con SNI no tendr�n acceso a ese
host virtual en particular.
</p>

<div class="warning"><p>
Esta opci�n s�lo est� disponible si httpd fue compilado contra una versi�n 
compatible con SNI de OpenSSL.
</p></div>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLStrictSNIVHostCheck on</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslusername" id="sslusername">Directiva</a> <a name="SSLUserName" id="SSLUserName">SSLUserName</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Nombre de variable para determinar el nombre de usuario</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLUserName <em>nombre de variable</em></code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el campo "usuario" en el objeto de solicitud de Apache.
Esto se usa por m�dulos menores para identificar el usuario con una cadena
de caracteres. En particular esto puede causar que la variable de entorno
<code>REMOTE_USER</code> sea configurada. El <em>nombre de variable</em> puede 
ser cualquiera de las <a href="#envvars">variables de entorno SSL</a>.</p>

<p>Cuando se activa la opci�n <code>FakeBasicAuth</code>, esta directiva
controla en su lgar el valor del nombre de usuario embebido dentro de la 
cabecera de autenticaci�n b�sica (vea <a href="#ssloptions">SSLOptions</a>).</p>

<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLUserName SSL_CLIENT_S_DN_CN</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslusestapling" id="sslusestapling">Directiva</a> <a name="SSLUseStapling" id="SSLUseStapling">SSLUseStapling</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Activa stapling de las respuestas OCSP en el saludo 
  TLS</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLUseStapling on|off</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLUseStapling off</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
<tr><th><a href="directive-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible si se usa OpenSSL 0.9.8h o posterior</td></tr>
</table>
<p>Esta opci�n activa el stapling de OCSP, tal y como se define en la extensi�n
TLS "Solicitud de Estado de Certificado" especificada en el RFC 6066. Si est�
activado (y solicitado por el cliente), mod_ssl incluir� una respuesta OCSP de
su propio certificado en el saludo TLS. Configurar una 
<code class="directive"><a href="#sslstaplingcache">SSLStaplingCache</a></code> es un pre-requisito para
activar stapling de OCSP.</p>

<p>El stapling de OCSP releva al cliente de consultar el respondedor OCSP por si
mismo, pero deber�a tenerse en cuenta que con la especificaci�n RFC 6066, la 
respuesta de <code>CertificateStatus</code> del servidor podr�a s�lo incluir 
una respuesta OCSP de un s�lo certificado. Para los certificados de servidor
con certificados de CA intermedias en su cadena (lo t�pico hoy en d�a),
stapling en su implementaci�n actual por tanto s�lo consigue su objetivo
parcialmente de "ahorrar varias peticiones y consumo de recursos" - vea tambi�n
el <a href="http://www.ietf.org/rfc/rfc6961.txt">RFC 6961</a>
(Extensi�n de TLS del Estado de M�ltiples Certificados).
</p>

<p>Cuando el stapling de OCSP est� activado, se usa el mutex 
<code>ssl-stapling</code> para controlar el acceso a la cahe de stapling de OCSP
para prevenir corrupci�n, y se usa el mutex <code>sss-stapling-refresh</code> 
para controlar los refrescos a las respuestas OCSP. Estos mutexes pueden ser
configurados usando la directiva 
<code class="directive"><a href="../mod/core.html#mutex">Mutex</a></code>.
</p>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslverifyclient" id="sslverifyclient">Directiva</a> <a name="SSLVerifyClient" id="SSLVerifyClient">SSLVerifyClient</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Tipo de verificaci�n de Certificado Cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLVerifyClient <em>nivel</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLVerifyClient none</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura el nivel de verificaci�n de Certificado para la 
Autenticaci�n de Cliente. Tenga en cuenta que esta directiva se puede usar tanto
en contexto servidor como en contexto directorio. En contexto de servidor se 
aplica al proceso de autenticaci�n de cliente usado en el saludo est�ndar de SSL
cuando se establece una conexi�n. En el contexto directorio fuerza una 
renegociaci�n SSL con el nivel de verificaci�n reconfigurado despu�s de que se 
lee la petiic�n HTTP pero antes de que se responda la respuesta HTTP.</p>

<p>
Los siguientes niveles est�n disponibles para <em>nivel</em>:</p>
<ul>
<li><strong>none</strong>:
     no se requiere Certificado cliente ninguno</li>
<li><strong>optional</strong>:
     el cliente <em>puede</em> presentar un Certificado v�lido</li>
<li><strong>require</strong>:
     el cliente <em>tiene que</em> presentar un Certificado v�lido</li>
<li><strong>optional_no_ca</strong>:
     el cliente puede presentar un Certificado v�lido<br />
     pero no tiene por qu� ser verificable (satisfactoriamente). No se puede
     depender de esta opci�n para la autenticaci�n de cliente.  </li>
</ul>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLVerifyClient require</pre>
</div>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="sslverifydepth" id="sslverifydepth">Directiva</a> <a name="SSLVerifyDepth" id="SSLVerifyDepth">SSLVerifyDepth</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Profundidad m�xima de Certificados CA en la verificaci�n de 
Certificado Cliente</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>SSLVerifyDepth <em>number</em></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>SSLVerifyDepth 1</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>server config, virtual host, directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_ssl</td></tr>
</table>
<p>
Esta directiva configura hasta qu� nivel debe mod_ssl verificar antes de decidir
cuando los clientes no tienen un certificado v�lido. Tenga en cuenta que esta
directiva puede usarse tanto en contexto servidor como en contexto directorio.
En contexto servidor se aplica al proceso de autenticaci�n de cliente en el
salido SSL est�ndar cuando se establece una conexi�n. En el contexto directorio
fuerza una renegociaci�n SSL con la profundidad de verficiaci�n de cliente
reconfigurada despu�s de que se lea la petici�n HTTP pero antes de que s� haya 
enviado la respuesta HTTP.</p>
<p>
La profundidad es en realidad el n�mero m�ximo de certificados CA intermedios,
p. ej. el n�mero de certificados CA m�ximo permitido a seguir en la verificaci�n
del certificado cliente. Una profundidad de 0 significa que s�lo se 
aceptan los certificados cliente autofirmados, la profundidad por defecto de 1
significa que el cliente puede ser autofirmado o tiene que estar firmado por una
CA que es directamente conocida por el servidor (p. ej. los certificados CA 
est�n bajo
<code class="directive"><a href="#sslcacertificatepath">SSLCACertificatePath</a></code>), etc.</p>
<div class="example"><h3>Ejemplo</h3><pre class="prettyprint lang-config">SSLVerifyDepth 10</pre>
</div>

</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_ssl.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_ssl.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_ssl.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_ssl.html';
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