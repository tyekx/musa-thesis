<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es"><head>
<meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
<!--
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              This file is generated from xml source: DO NOT EDIT
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      -->
<title>mod_access_compat - Servidor HTTP Apache Versi�n 2.5</title>
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
<div id="preamble"><h1>M�dulo Apache mod_access_compat</h1>
<div class="toplang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_access_compat.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_access_compat.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_access_compat.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_access_compat.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div>
<table class="module"><tr><th><a href="module-dict.html#Description">Descripci�n:</a></th><td>Autorizaciones de grupo basadas en el host (nombre o direcci�n IP)</td></tr>
<tr><th><a href="module-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="module-dict.html#ModuleIdentifier">Identificador de M�dulos:</a></th><td>access_compat_module</td></tr>
<tr><th><a href="module-dict.html#SourceFile">Fichero de C�digo Fuente:</a></th><td>mod_access_compat.c</td></tr>
<tr><th><a href="module-dict.html#Compatibility">Compatibilidad:</a></th><td>Disponible en el servidor Apache HTTP 2.3 como un m�dulo de compatibilidad con versiones previas de Apache http 2.x. Las directivas facilitadas por este m�dulo han quedado obsoletas en favor de la nueva refactorizaci�n de authz. Por favor vea <code class="module"><a href="../mod/mod_authz_host.html">mod_authz_host</a></code></td></tr></table>
<h3>Resumen de contenidos</h3>

    <p>Las directivas facilitadas por <code class="module"><a href="../mod/mod_access_compat.html">mod_access_compat</a></code> se usan en las secciones 
    <code class="directive"><a href="../mod/core.html#directory">&lt;Directory&gt;</a></code>, 
    <code class="directive"><a href="../mod/core.html#files">&lt;Files&gt;</a></code>, y 
    <code class="directive"><a href="../mod/core.html#location">&lt;Location&gt;</a></code> as� como en los ficheros 
    <code><a href="core.html#accessfilename">.htaccess</a></code> para controlar el acceso a partes espec�ficas del servidor. El acceso se puede controlar en base al nombre de host del cliente, direcci�n IP u otras caracter�sticas de la petici�n del cliente, tal y como se capturan en las 
    <a href="../env.html">variables de entorno</a>. La directivas 
    <code class="directive"><a href="#allow">Allow</a></code> y 
    <code class="directive"><a href="#deny">Deny</a></code> se usan para especificar qu� clientes tienen acceso y cuales no al servidor, mientras que la directiva 
    <code class="directive"><a href="#order">Order</a></code> configura el estado del acceso por defecto, y configura c�mo las directivas 
    <code class="directive"><a href="#allow">Allow</a></code> y 
    <code class="directive"><a href="#deny">Deny</a></code> interactuan la una con la otra.</p>

    <p>Se pueden configurar simult�neamente restricciones basadas en el host y autenticaci�n con contrase�a. En ese caso, la directiva <code class="directive"><a href="#satisfy">Satisfy</a></code> se usa para determinar como los dos sets de restricciones interactuan.</p>

    <div class="warning"><h3>Atenci�n</h3>
      <p>Las directivas facilitadas por <code class="module"><a href="../mod/mod_access_compat.html">mod_access_compat</a></code> han quedado obsoletas en favor de
      <code class="module"><a href="../mod/mod_authz_host.html">mod_authz_host</a></code>. Mezclar directivas antiguas como 
      <code class="directive"><a href="#order">Order</a></code>, 
      <code class="directive"><a href="#allow">Allow</a></code> o 
      <code class="directive"><a href="#deny">Deny</a></code> con las nuevas directivas como 
      <code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code> es t�cnicamente posible pero no recomendable. �ste m�dulo se cre� para dar soporte a configuraciones que solo contienen directivas antiguas para facilitar una actualizaci�n a la versi�n 2.4. Por favor compruebe la gu�a 
      <a href="../upgrading.html">Actualizando</a> para m�s informaci�n.</p>
    </div>

    <p>En general, las directivas de restricci�n de acceso aplican a todos los m�todos de acceso (<code>GET</code>, <code>PUT</code>, <code>POST</code>, etc). �ste es el comportamiento deseado en la mayor parte de los casos. Sin embargo, es posible restringir algunos m�todos, dejando otros m�todos sin restricci�n, configurando las directivas dentro de una secci�n <code class="directive"><a href="../mod/core.html#limit">&lt;Limit&gt;</a></code>.</p>

    <div class="note"> <h3>Fusionando secciones de configuraci�n</h3>
      <p>Cuando cualquier directiva facilitada por este m�dulo se usa en una nueva secci�n de configuraci�n, no se heredar� ninguna directiva facilitada por este m�dulo en secciones anteriores de configuraci�n.</p>
    </div>

</div>
<div id="quickview"><h3 class="directives">Directivas</h3>
<ul id="toc">
<li><img alt="" src="../images/down.gif" /> <a href="#allow">Allow</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#deny">Deny</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#order">Order</a></li>
<li><img alt="" src="../images/down.gif" /> <a href="#satisfy">Satisfy</a></li>
</ul>
<h3>Bugfix checklist</h3><ul class="seealso"><li><a href="https://www.apache.org/dist/httpd/CHANGES_2.4">httpd changelog</a></li><li><a href="https://bz.apache.org/bugzilla/buglist.cgi?bug_status=__open__&amp;list_id=144532&amp;product=Apache%20httpd-2&amp;query_format=specific&amp;order=changeddate%20DESC%2Cpriority%2Cbug_severity&amp;component=mod_access_compat">Known issues</a></li><li><a href="https://bz.apache.org/bugzilla/enter_bug.cgi?product=Apache%20httpd-2&amp;component=mod_access_compat">Report a bug</a></li></ul><h3>Consulte tambi�n</h3>
<ul class="seealso">
<li><code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code></li>
<li><code class="module"><a href="../mod/mod_authz_host.html">mod_authz_host</a></code></li>
<li><code class="module"><a href="../mod/mod_authz_core.html">mod_authz_core</a></code></li>
<li><a href="#comments_section">Comentarios</a></li></ul></div>

<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="allow" id="allow">Directiva</a> <a name="Allow" id="Allow">Allow</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Controla qu� hosts pueden acceder a un �rea del servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code> Allow from all|<var>host</var>|env=[!]<var>env-variable</var>
[<var>host</var>|env=[!]<var>env-variable</var>] ...</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>Limit</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_access_compat</td></tr>
</table>
    <p>La directiva <code class="directive">Allow</code> afecta a qu� hosts pueden acceder un �rea del servidor. El acceso puede controlarse por nombre de host, direcci�n IP, rango de direcciones IP, o por otras caracter�sitcas de la petici�n del cliente capturadas en variables de entorno.</p>

    <p>El primer par�metro para esta directiva siempre es <code>from</code>. Los siguientes par�metros pueden tomar tres formas diferentes. Si se especifica <code>Allow from all</code>, entonces se permite el acceso a todos los host, dependiendo de la configuraci�n de las directivas 
    <code class="directive"><a href="#deny">Deny</a></code> y 
    <code class="directive"><a href="#order">Order</a></code> tal y como se indic� m�s arriba. Para permitir solo host espec�ficos o grupos de host acceder al servidor, se puede especificar el <em>host</em> en cualquiera de los siguientes formatos:</p>

    <dl>
      <dt>Un nomre de dominio (parcial)</dt>

      <dd>
      <pre class="prettyprint lang-config">Allow from example.org
Allow from .net example.edu</pre>

      
      <p>Hosts cuyo nombre coincide, o acaba en estas cadenas de caracteres se les permite acceso. Solo componentes completos pueden coincidir, as� que el ejemplo de arriba coincidir� con <code>foo.example.org</code> pero no coincidir�n con <code>fooexample.org</code>. Esta configuraci�n provocar� que Apache httpd haga una doble resoluci�n de DNS en la direcci�n IP del cliente, independientemente de la configuraci�n de la directiva 
      <code class="directive"><a href="../mod/core.html#hostnamelookups">HostnameLookups</a></code>. Har� una resoluci�n inversa de DNS en la direcci�n IP para encontrar el nombre de host asociado, y entonces har� una resoluci�n del nombre de host para asegurarse de que coincide con la direcci�n IP original. Solo se le dar� acceso al nombre de host si ambas resoluciones de DNS son consistentes.</p></dd>

      <dt>Una direcci�n IP completa</dt>

      <dd>
      <pre class="prettyprint lang-config">Allow from 10.1.2.3
Allow from 192.168.1.104 192.168.1.205</pre>

      <p>Se le permite acceso a una direcci�n IP de un host</p></dd>

      <dt>Una direcci�n IP parcial</dt>

      <dd>
      <pre class="prettyprint lang-config">Allow from 10.1
Allow from 10 172.20 192.168.2</pre>

      <p>Los primeros 1 al 3 bytes de una direcci�n IP, para restricci�n de subred.</p></dd>

      <dt>Una pareja de red/m�scara de red</dt>

      <dd>
      <pre class="prettyprint lang-config">Allow from 10.1.0.0/255.255.0.0</pre>


      <p>Una red a.b.c.d, y una m�scara de red w.x.y.z. Para una restricci�n de subred m�s espec�fica.</p></dd>

      <dt>Una especificaci�n de red/nnn CIDR</dt>

      <dd>
      <pre class="prettyprint lang-config">Allow from 10.1.0.0/16</pre>


      <p>Similar al caso anterior, exceptuando que la m�scara de red se especifica con n�mero de bits.</p></dd>
    </dl>

    <p>Tenga en cuenta que los tres �ltimos ejemplos coinciden exactamente con el mismo grupo de hosts.</p>

    <p>Direcciones y subredes IPv6 pueden especificarse como se describe aqu�:</p>

    <pre class="prettyprint lang-config">Allow from 2001:db8::a00:20ff:fea7:ccea
Allow from 2001:db8::a00:20ff:fea7:ccea/10</pre>


    <p>El tercer formato de par�metros para la directiva <code class="directive">Allow</code> permite que el acceso al servidor se controle mediante la existencia de 
    <a href="../env.html">variable de entorno</a>. Cuando se especifica 
    <code>Allow from env=<var>env-variable</var></code>, entonces se le da acceso si la variable de entorno <var>env-variable</var> existe. Cuando se especifica 
    <code>Allow from env=!<var>env-variable</var></code>, entonces se da acceso si la variable de entorno 
    <var>env-variable</var> no existe. El servidor facilita la configuraci�n de variables de entorno de una manera flexible bas�ndose en las caracter�sticas de la petici�n del cliente usando las directivas facilitadas por <code class="module"><a href="../mod/mod_setenvif.html">mod_setenvif</a></code>. Por tanto, esta directiva se puede usar para permitir acceso bas�ndose en tales factores como el <code>User-Agent</code> del cliente (tipo de navegador), <code>Referer</code>, u otros campos de cabeceras HTTP de petici�n.</p>

    <pre class="prettyprint lang-config">SetEnvIf User-Agent ^KnockKnock/2\.0 let_me_in
&lt;Directory "/docroot"&gt;
    Order Deny,Allow
    Deny from all
    Allow from env=let_me_in
&lt;/Directory&gt;</pre>


    <p>En este caso, navegadores con una cadena user-agent que comienza con <code>KnockKnock/2.0</code> podr�n acceder, y al resto se les denegar� el acceso.</p>

    <div class="note"> <h3>Fusi�n de secciones de configuraci�n</h3>
      <p>Cuando se usa cualquier directiva facilitada por este m�dulo en una nueva secci�n de configuraci�n, no se heredar� ninguna directiva facilitada por este m�dulo en secciones anteriores de configuraci�n.</p>
    </div>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="deny" id="deny">Directiva</a> <a name="Deny" id="Deny">Deny</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Controla a qu� hosts se les deniega el acceso al servidor</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code> Deny from all|<var>host</var>|env=[!]<var>env-variable</var>
[<var>host</var>|env=[!]<var>env-variable</var>] ...</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>Limit</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_access_compat</td></tr>
</table>
    <p>Esta directiva permite que se restrinja el acceso al servidor bas�ndose en el nombre de host, direcci�n IP, o variables de entorno. Los par�metros para la directiva 
    <code class="directive">Deny</code> son id�nticos a los par�metros para la directiva 
    <code class="directive"><a href="#allow">Allow</a></code>.</p>

</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="order" id="order">Directiva</a> <a name="Order" id="Order">Order</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Controla el estado por defecto del acceso y el orden en que se eval�an 
  <code class="directive">Allow</code> y 
<code class="directive">Deny</code>.</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code> Order <var>ordering</var></code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Order Deny,Allow</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>Limit</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_access_compat</td></tr>
</table>

    <p>La directiva <code class="directive">Order</code> , junto con las directivas
    <code class="directive"><a href="#allow">Allow</a></code> y
    <code class="directive"><a href="#deny">Deny</a></code>, realizan un sistema de control de tres fases. La primera fase proceso o bien todas las directivas 
    <code class="directive"><a href="#allow">Allow</a></code> o todas las directivas 
    <code class="directive"><a href="#deny">Deny</a></code>, tal y como se haya especificado en la directiva  
    <code class="directive"><a href="#order">Order</a></code>. La segunda fase interpreta el resto de directivas 
    (<code class="directive"><a href="#deny">Deny</a></code> o
    <code class="directive"><a href="#allow">Allow</a></code>). La tercera fase se aplica a todas las peticiones que no coinciden con cualquiera de las dos fases anteriores.</p>

    <p>Tenga en cuenta que todas las directivas 
    <code class="directive"><a href="#allow">Allow</a></code> y 
    <code class="directive"><a href="#deny">Deny</a></code> son procesadas, al contrario que el cortafuegos t�pico, donde solo se usa la primera coincidencia. La �ltima coincidencia es efectiva (tambi�n al contrario que un cortafuegos t�pico). Adem�s, el orden en el que las directivas aparecen en la configuraci�n no es relevante -- todas las l�neas 
    <code class="directive"><a href="#allow">Allow</a></code> se interpretan como un grupo, todas las l�neas <code class="directive"><a href="#deny">Deny</a></code> se interpretan como otro grupo, y el estado por defecto se procesa a s� mismo.</p>

    <p><em>Ordenar</em> es una de las dos:</p>

    <dl>
      <dt><code>Allow,Deny</code></dt>

      <dd>Primero, se interpretan todas las directivas <code class="directive"><a href="#allow">Allow</a></code>; al menos una debe coincidir, o se deniega el acceso a la petici�n. Despu�s, todas las directivas <code class="directive"><a href="#deny">Deny</a></code> son interpretadas. Si alguna coincide, se deniega el acceso a la petici�n. Por �ltimo, cualquier petici�n que no encaje en una directiva <code class="directive"><a href="#allow">Allow</a></code> o <code class="directive"><a href="#deny">Deny</a></code> se les deniega el acceso por defecto.</dd>

      <dt><code>Deny,Allow</code></dt>

      <dd>Primero, se interpretan todas las directivas <code class="directive"><a href="#deny">Deny</a></code>; si alguna coincide, se deniega el acceso a la petici�n <strong>a menos que</strong> tambi�n encaje con una directiva <code class="directive"><a href="#allow">Allow</a></code>. Cualquier petici�n que no encaje ni con directivas <code class="directive"><a href="#allow">Allow</a></code> ni <code class="directive"><a href="#deny">Deny</a></code> se les permite el acceso.</dd>

      <dt><code>Mutual-failure</code></dt>

      <dd>Este orden tiene el mismo efecto que <code>Order Allow,Deny</code> y ha quedado obsoleto en su favor.</dd>
    </dl>

    <p>Las palabras clave solo pueden ser separadas por coma; no se permiten <em>espacios en blanco</em> entre ellas.</p>

    <table class="bordered">
      <tr>
        <th>Filtro</th>
        <th>Resultado Allow,Deny</th>
        <th>Resultado Deny,Allow</th>
      </tr><tr>
        <th>Solo coincide con Allow</th>
        <td>Petici�n permitida</td>
        <td>Petici�n permitida</td>
      </tr><tr>
        <th>Solo coincide con Deny</th>
        <td>Petici�n denegada</td>
        <td>Petici�n denegada</td>
      </tr><tr>
        <th>No coincide</th>
        <td>Por defecto con la segunda directiva: Denegado</td>
        <td>Por defecto con la segunda directiva: Permitido</td>
      </tr><tr>
        <th>Coincide con ambas Allow &amp; Deny</th>
        <td>Control de coincidencia final: Denegado</td>
        <td>Control de coincidencia final: Permitido</td>
      </tr>
    </table>

    <p>En el siguiente ejemplo, todos los host en el dominio example.org tienen permitido el acceso; el resto de host tienen el acceso denegado.</p>

    <pre class="prettyprint lang-config">Order Deny,Allow
Deny from all
Allow from example.org</pre>


    <p>En el siguiente ejemplo, todos los hosts del dominio example.org tienen permitido el acceso, excepto para los host que est�n en el subdominio foo.example.org, a los que se le deniega el acceso. Todos los host que no coinciden con el dominio example.org tienen el acceso denegado porque el estado por defecto es <code class="directive"><a href="#deny">Deny</a></code> con el acceso al servidor.</p>

    <pre class="prettyprint lang-config">Order Allow,Deny
Allow from example.org
Deny from foo.example.org</pre>


    <p>Por otro lado, si el <code class="directive">Order</code> en el �ltimo ejemplo se cambia a <code>Deny,Allow</code>, se permitir� el acceso a todos los host. Esto pasa porque, independientemente del orden actual de las directivas en el fichero de configuraci�n, <code>Allow from example.org</code> ser� interpretrado en �ltimo lugar y sobreescribir� la orden de <code>Deny from foo.example.org</code>. Todos los host que no est�n en el dominio <code>example.org</code> tambi�n tendr�n acceso porque el estado por defecto es <code class="directive"><a href="#allow">Allow</a></code>.</p>

    <p>La presencia de una directiva <code class="directive">Order</code> puede afectar el acceso a una parte del servidor incluso en la ausencia de las directivas <code class="directive"><a href="#allow">Allow</a></code>
    y <code class="directive"><a href="#deny">Deny</a></code> por su efecto en el estado del acceso por defecto. Por ejemplo,</p>

    <pre class="prettyprint lang-config">&lt;Directory "/www"&gt;
    Order Allow,Deny
&lt;/Directory&gt;</pre>


    <p>denegar� todos los accesos al directorio <code>/www</code> porque el estado del acceso por defecto est� configurado con <code class="directive"><a href="#deny">Deny</a></code>.</p>

    <p>La directiva <code class="directive">Order</code> controla el orden de procesamiento de las directivas solo en cada fase del procesamiento de la configuraci�n de un servidor. Esto implica, por ejemplo, que una directiva 
    <code class="directive"><a href="#allow">Allow</a></code> o <code class="directive"><a href="#deny">Deny</a></code> dentro de una secci�n
    <code class="directive"><a href="../mod/core.html#location">&lt;Location&gt;</a></code> ser� siempre interpretada despu�s de una directiva 
     <code class="directive"><a href="#allow">Allow</a></code> o <code class="directive"><a href="#deny">Deny</a></code> dentro de una secci�n
    <code class="directive"><a href="../mod/core.html#directory">&lt;Directory&gt;</a></code> o fichero <code>.htaccess</code>, independientemente de la configuraci�n de la directiva <code class="directive">Order</code>. Para detalles sobre la fusi�n de secciones de configuraci�n, vea la documentaci�n en <a href="../sections.html">C�mo funcionan las secciones Directory, Location y Files</a>.</p>

    <div class="note"> <h3>Fusi�n de secciones de configuraci�n</h3>
      <p>Cuando se usa cualquier directiva facilitada por este m�dulo en una nueva secci�n de configuraci�n, no se heredar� ninguna directiva facilitada por este m�dulo en secciones anteriores de configuraci�n.</p>
    </div>


</div>
<div class="top"><a href="#page-header"><img alt="top" src="../images/up.gif" /></a></div>
<div class="directive-section"><h2><a name="satisfy" id="satisfy">Directiva</a> <a name="Satisfy" id="Satisfy">Satisfy</a></h2>
<table class="directive">
<tr><th><a href="directive-dict.html#Description">Descripci�n:</a></th><td>Interacci�n entre control de acceso a nivel-de-hostess y autenticaci�n de usuario</td></tr>
<tr><th><a href="directive-dict.html#Syntax">Sintaxis:</a></th><td><code>Satisfy Any|All</code></td></tr>
<tr><th><a href="directive-dict.html#Default">Valor por defecto:</a></th><td><code>Satisfy All</code></td></tr>
<tr><th><a href="directive-dict.html#Context">Contexto:</a></th><td>directory, .htaccess</td></tr>
<tr><th><a href="directive-dict.html#Override">Anula:</a></th><td>AuthConfig</td></tr>
<tr><th><a href="directive-dict.html#Status">Estado:</a></th><td>Extensi�n</td></tr>
<tr><th><a href="directive-dict.html#Module">M�dulo:</a></th><td>mod_access_compat</td></tr>
</table>
    <p>Pol�tica de acceso si se usan ambos <code class="directive"><a href="#allow">Allow</a></code> y <code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code>. El par�metro puede ser <code>All</code> o <code>Any</code>. Esta directiva solo es �til si el acceso a un �rea en particular se est� restringiendo por usuario/contrase�a <em>y</em> direcci�n de host del cliente. En este caso el comportamiento por defecto (<code>All</code>) es requerir que el cliente pase la restricci�n de direcci�n de acceso <em>y</em> adem�s introduce un usuario y contrase�a v�lidos. Con la opci�n <code>Any</code> se le garantizar� acceso al cliente si pasa la restricci�n de host o introduce un usuario y contrase�a v�lidos. Esto puede usarse para restringir con contrase�a el acceso a un area, pero para permitir acceso a los clientes desde unas direcciones en particular sin pedirles contrase�a.</p>

    <p>Por ejemplo, si quisiera dejar entrar a personas de su red con acceso sin restricciones a una parte de su website, pero requiere que gente de fuera de su red facilite una contrase�a, podr�a usar una configuraci�n similar a la siguiente:</p>

    <pre class="prettyprint lang-config">Require valid-user
Allow from 192.168.1
Satisfy Any</pre>


    <p>Otro uso t�pico de la directiva <code class="directive">Satisfy</code> es para suavizar las restricciones de acceso a un subdirectorio:</p>

    <pre class="prettyprint lang-config">&lt;Directory "/var/www/private"&gt;
    Require valid-user
&lt;/Directory&gt;

&lt;Directory "/var/www/private/public"&gt;
    Allow from all
    Satisfy Any
&lt;/Directory&gt;</pre>


    <p>En el ejemplo de arriba, se requiere autenticaci�n para el directorio <code>/var/www/private</code>, pero no se requerir� para el directorio <code>/var/www/private/public</code>.</p>

    <p>Desde la versi�n 2.0.51 las directivas <code class="directive">Satisfy</code> pueden restringirse a m�todos espec�ficos con secciones <code class="directive"><a href="../mod/core.html#limit">&lt;Limit&gt;</a></code> y <code class="directive"><a href="../mod/core.html#limitexcept">&lt;LimitExcept&gt;</a></code>.</p>

    <div class="note"> <h3>Fusi�n de secciones de configuraci�n.</h3>
      <p>Cuando se usa cualquier directiva facilitada por este m�dulo en una nueva secci�n de configuraci�n, no se heredar� ninguna directiva facilitada por este m�dulo en secciones anteriores de configuraci�n.</p>
    </div>


<h3>Consulte tambi�n</h3>
<ul>
<li><code class="directive"><a href="#allow">Allow</a></code></li>
<li><code class="directive"><a href="../mod/mod_authz_core.html#require">Require</a></code></li>
</ul>
</div>
</div>
<div class="bottomlang">
<p><span>Idiomas disponibles: </span><a href="../en/mod/mod_access_compat.html" hreflang="en" rel="alternate" title="English">&nbsp;en&nbsp;</a> |
<a href="../es/mod/mod_access_compat.html" title="Espa�ol">&nbsp;es&nbsp;</a> |
<a href="../fr/mod/mod_access_compat.html" hreflang="fr" rel="alternate" title="Fran�ais">&nbsp;fr&nbsp;</a> |
<a href="../ja/mod/mod_access_compat.html" hreflang="ja" rel="alternate" title="Japanese">&nbsp;ja&nbsp;</a></p>
</div><div class="top"><a href="#page-header"><img src="../images/up.gif" alt="top" /></a></div><div class="section"><h2><a id="comments_section" name="comments_section">Comentarios</a></h2><div class="warning"><strong>Notice:</strong><br />This is not a Q&amp;A section. Comments placed here should be pointed towards suggestions on improving the documentation or server, and may be removed again by our moderators if they are either implemented or considered invalid/off-topic. Questions on how to manage the Apache HTTP Server should be directed at either our IRC channel, #httpd, on Freenode, or sent to our <a href="http://httpd.apache.org/lists.html">mailing lists</a>.</div>
<script type="text/javascript"><!--//--><![CDATA[//><!--
var comments_shortname = 'httpd';
var comments_identifier = 'http://httpd.apache.org/docs/trunk/mod/mod_access_compat.html';
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