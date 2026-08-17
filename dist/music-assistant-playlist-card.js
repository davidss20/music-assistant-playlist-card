function e(e,t,i,a){var s,r=arguments.length,o=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(i,e,a)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:h}=Object,m=globalThis,_=m.trustedTypes,g=_?_.emptyScript:"",y=m.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...p(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const r=this.constructor;if(!1===a&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[f("elementProperties")]=new Map,k[f("finalized")]=new Map,y?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+q,P=`<${M}>`,E=document,j=()=>E.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,I="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,O=/>/g,R=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,F=/"/g,Q=/^(?:script|style|textarea|title)$/i,U=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),D=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=E.createTreeWalker(E,129);function B(e,t){if(!C(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=N;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===N?"!--"===l[1]?o=L:void 0!==l[1]?o=O:void 0!==l[2]?(Q.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=s??N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?R:'"'===l[3]?F:H):o===F||o===H?o=R:o===L||o===O?o=N:(o=R,s=void 0);const p=o===R&&e[t+1].startsWith("/>")?" ":"";r+=o===N?i+P:c>=0?(a.push(n),i.slice(0,c)+z+i.slice(c)+q+p):i+q+(-2===c?t:p)}return[B(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[l,c]=Z(e,t);if(this.el=G.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=K.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(z)){const t=c[r++],i=a.getAttribute(e).split(q),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(q)&&(n.push({type:6,index:s}),a.removeAttribute(e));if(Q.test(a.tagName)){const e=a.textContent.split(q),t=e.length-1;if(t>0){a.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],j()),K.nextNode(),n.push({type:2,index:++s});a.append(e[t],j())}}}else if(8===a.nodeType)if(a.data===M)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(q,e+1));)n.push({type:7,index:s}),e+=q.length-1}s++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,a){if(t===D)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=J(e,s._$AS(e,t.values),s,a)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??E).importNode(t,!0);K.currentNode=a;let s=K.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new X(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new se(s,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(s=K.nextNode(),r++)}return K.currentNode=E,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),T(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==D&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>C(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(B(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Y(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new G(e)),t}k(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new X(this.O(j()),this.O(j()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=J(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==D,r&&(this._$AH=e);else{const a=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=J(this,a[i+o],t,o),n===D&&(n=this._$AH[o]),r||=!T(n)||n!==this._$AH[o],n===W?e=W:e!==W&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ae extends ee{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===D)return;const i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(G,X),(w.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ne extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new X(t.insertBefore(j(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ne._$litElement$=!0,ne.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ne});const le=oe.litElementPolyfillSupport;le?.({LitElement:ne}),(oe.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},pe=(e=de,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function ue(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return ue({...e,state:!0,attribute:!1})}const me=o`
  :host {
    --mdc-icon-size: 20px;
    --playlist-card-spacing: 12px;
    --playlist-card-border-radius: 12px;
    --playlist-image-size: 100%;
    --playlist-item-gap: 12px;
    display: flex;
    flex-direction: column;
  }

  /* RTL Support */
  :host([dir="rtl"]) {
    direction: rtl;
  }

  :host([dir="rtl"]) .card-header {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .speaker-button {
    flex-direction: row-reverse;
    text-align: right;
  }

  :host([dir="rtl"]) .speaker-button-check {
    margin-left: 0;
    margin-right: auto;
  }

  :host([dir="rtl"]) .now-playing-info {
    text-align: center;
  }

  :host([dir="rtl"]) .secondary-controls {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .secondary-controls-left,
  :host([dir="rtl"]) .secondary-controls-right {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .volume-container {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .volume-full-width {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .volume-slider-full {
    transform: rotateY(180deg);
  }

  :host([dir="rtl"]) .progress-time {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .tab-button {
    flex-direction: column;
  }

  :host([dir="rtl"]) .playlist-info {
    text-align: center;
  }

  ha-card {
    overflow: visible;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* Responsive height - no fixed height */
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--playlist-card-spacing);
    padding-bottom: 0;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-content {
    padding: var(--playlist-card-spacing);
  }

  .card-content::-webkit-scrollbar {
    width: 6px;
  }

  .card-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .card-content::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .card-content::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* Speaker Selector */
  .speaker-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: var(--card-background-color, var(--ha-card-background));
    border-radius: var(--playlist-card-border-radius);
    margin-bottom: var(--playlist-card-spacing);
  }

  .speaker-selector ha-icon {
    color: var(--primary-text-color);
    opacity: 0.7;
  }

  .speaker-select {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .speaker-select:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .speaker-select:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .speaker-select option {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }

  /* ==========================================================================
     Playlist Toolbar
     ========================================================================== */

  .playlist-toolbar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: none;
    border-radius: 10px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
  }

  :host([dir="rtl"]) .search-input {
    padding: 10px 40px 10px 12px;
  }

  .search-input::placeholder {
    color: var(--secondary-text-color);
  }

  .search-input:focus {
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    pointer-events: none;
  }

  :host([dir="rtl"]) .search-icon {
    left: auto;
    right: 12px;
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border: none;
    border-radius: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .filter-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .filter-button.active {
    background: color-mix(in srgb, var(--primary-color) 20%, transparent);
    color: var(--primary-color);
  }

  .filter-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .sort-dropdown {
    position: relative;
  }

  .sort-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    background: var(--card-background-color, var(--ha-card-background));
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    min-width: 160px;
  }

  :host([dir="rtl"]) .sort-menu {
    right: auto;
    left: 0;
  }

  .sort-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 14px;
    background: transparent;
    border: none;
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  :host([dir="rtl"]) .sort-option {
    text-align: right;
  }

  .sort-option:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .sort-option.active {
    color: var(--primary-color);
  }

  .sort-option ha-icon {
    --mdc-icon-size: 18px;
  }

  .view-toggle {
    display: flex;
    align-items: center;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    overflow: hidden;
  }

  .view-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: transparent;
    border: none;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .view-button.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }

  .view-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .toolbar-spacer {
    flex: 1;
  }

  /* Playlist Container with Scroll */
  .playlists-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  .playlists-scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .playlists-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .playlists-scroll-container::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .playlists-scroll-container::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* Playlist Grid */
  .playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--playlist-item-gap);
  }

  .playlist-grid.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .playlist-grid.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .playlist-grid.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .playlist-grid.columns-5 {
    grid-template-columns: repeat(5, 1fr);
  }

  .playlist-grid.columns-6 {
    grid-template-columns: repeat(6, 1fr);
  }

  /* Playlist List View */
  .playlist-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .playlist-list .playlist-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 8px;
    border-radius: 10px;
  }

  .playlist-list .playlist-item:hover {
    transform: none;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .playlist-list .playlist-image-container {
    width: 56px;
    height: 56px;
    padding-top: 0;
    flex-shrink: 0;
    border-radius: 8px;
  }

  .playlist-list .playlist-info {
    flex: 1;
    min-width: 0;
    padding: 0;
    text-align: left;
  }

  :host([dir="rtl"]) .playlist-list .playlist-info {
    text-align: right;
  }

  .playlist-list .playlist-name {
    font-size: 14px;
  }

  /* List view specific styles handled in .playlist-list .play-button-corner above */

  /* Playlist Item */
  .playlist-item {
    position: relative;
    cursor: pointer;
    border-radius: var(--playlist-card-border-radius);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: var(--card-background-color, var(--ha-card-background));
  }

  .playlist-item:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .playlist-item:active {
    transform: scale(0.98);
  }

  .playlist-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .playlist-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .playlist-item:hover .playlist-image {
    transform: scale(1.05);
  }

  .playlist-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .playlist-placeholder ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  /* Play button in corner (like official HA player) */
  .play-button-corner {
    position: absolute;
    bottom: 48px;
    right: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
    opacity: 0.9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  :host([dir="rtl"]) .play-button-corner {
    right: auto;
    left: 8px;
  }

  .play-button-corner:hover {
    transform: scale(1.1);
    opacity: 1;
    filter: brightness(1.1);
  }

  .play-button-corner ha-icon {
    --mdc-icon-size: 20px;
    color: var(--text-primary-color, #fff);
  }

  /* List view play button */
  .playlist-list .play-button-corner {
    position: relative;
    bottom: auto;
    right: auto;
    left: auto;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    opacity: 0.8;
    box-shadow: none;
  }

  .playlist-list .playlist-item:hover .play-button-corner {
    opacity: 1;
  }

  /* Legacy play button (for other components) */
  .play-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .play-button:hover {
    transform: scale(1.1);
    background: var(--primary-color);
    filter: brightness(1.1);
  }

  .play-button ha-icon {
    --mdc-icon-size: 24px;
    color: var(--text-primary-color, #fff);
  }

  /* Playlist Info */
  .playlist-info {
    padding: 8px;
  }

  .playlist-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
  }

  .playlist-meta {
    font-size: 11px;
    color: var(--secondary-text-color);
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 16px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-text {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Error State */
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .error-container ha-icon {
    --mdc-icon-size: 48px;
    color: var(--error-color, #db4437);
  }

  .error-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Empty State */
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .empty-container ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .empty-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Config Warning */
  .config-warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .config-warning ha-icon {
    --mdc-icon-size: 48px;
    color: var(--warning-color, #ffa600);
  }

  .config-warning-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Ripple Effect */
  .ripple {
    position: relative;
    overflow: hidden;
  }

  .ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .ripple:active::after {
    width: 200px;
    height: 200px;
    opacity: 1;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  }

  /* ==========================================================================
     Tab Navigation
     ========================================================================== */

  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 4px;
    background: var(--card-background-color, var(--ha-card-background));
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
  }

  .tab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--secondary-text-color);
    flex: 1;
    max-width: 80px;
  }

  .tab-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .tab-button.active {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  }

  .tab-button ha-icon {
    --mdc-icon-size: 24px;
  }

  .tab-button .tab-label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  /* Tab Content */
  .tab-content {
    display: flex;
    flex-direction: column;
    /* Height controlled by CSS variable, default 680px */
    height: var(--card-height, 680px);
    overflow: hidden;
  }

  .tab-view {
    padding: var(--playlist-card-spacing);
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
  }

  /* ==========================================================================
     Now Playing View
     ========================================================================== */

  .now-playing {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .now-playing-artwork {
    /* Size controlled by CSS variable, responsive to card height */
    width: min(var(--artwork-size, 280px), 80vw);
    height: min(var(--artwork-size, 280px), 80vw);
    border-radius: 16px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
  }

  .now-playing-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .now-playing-artwork-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .now-playing-artwork-placeholder ha-icon {
    --mdc-icon-size: 80px;
    color: var(--secondary-text-color);
    opacity: 0.3;
  }

  .now-playing-info {
    text-align: center;
    width: 100%;
  }

  .now-playing-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
    margin: 0 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-playing-artist {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-playing-idle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex: 1;
    color: var(--secondary-text-color);
  }

  .now-playing-idle ha-icon {
    --mdc-icon-size: 64px;
    opacity: 0.3;
  }

  .now-playing-idle-text {
    font-size: 16px;
  }

  /* Progress Bar */
  .progress-container {
    width: 100%;
    max-width: 100%;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .progress-time {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  /* Player Controls */
  .player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .control-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--primary-text-color);
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .control-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .control-button:active {
    transform: scale(0.95);
  }

  .control-button ha-icon {
    --mdc-icon-size: 28px;
  }

  .control-button.play-pause {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    padding: 16px;
  }

  .control-button.play-pause:hover {
    filter: brightness(1.1);
    background: var(--primary-color);
  }

  .control-button.play-pause ha-icon {
    --mdc-icon-size: 32px;
  }

  .control-button.small ha-icon {
    --mdc-icon-size: 20px;
  }

  .control-button.active {
    color: var(--primary-color);
  }

  /* Secondary Controls */
  .secondary-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    padding: 0 8px;
  }

  .secondary-controls-left,
  .secondary-controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Volume Slider */
  .volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
    border-radius: 2px;
    cursor: pointer;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }

  .volume-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
  }

  /* Full Width Volume Slider */
  .volume-full-width {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    padding: 0 8px;
  }

  .volume-full-width ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  .volume-slider-full {
    flex: 1;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) var(--volume-percent, 0%), var(--divider-color, rgba(0,0,0,0.1)) var(--volume-percent, 0%), var(--divider-color, rgba(0,0,0,0.1)) 100%);
    border-radius: 4px;
    cursor: pointer;
  }

  .volume-slider-full::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 4px;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  .volume-slider-full::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    margin-top: -6px;
  }

  .volume-slider-full::-moz-range-track {
    height: 8px;
    border-radius: 4px;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  .volume-slider-full::-moz-range-progress {
    height: 8px;
    border-radius: 4px;
    background: var(--primary-color);
  }

  .volume-slider-full::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  /* ==========================================================================
     Speakers View
     ========================================================================== */

  .speakers-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  .speakers-grid::-webkit-scrollbar {
    width: 6px;
  }

  .speakers-grid::-webkit-scrollbar-track {
    background: transparent;
  }

  .speakers-grid::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .speakers-grid::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  .speaker-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .speaker-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .speaker-button.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }

  .speaker-button ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
  }

  .speaker-button.active ha-icon {
    color: var(--primary-color);
  }

  .speaker-button-info {
    flex: 1;
    min-width: 0;
  }

  .speaker-button-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .speaker-button-state {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .speaker-button-check {
    --mdc-icon-size: 20px;
    color: var(--primary-color);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .speaker-button.active .speaker-button-check {
    opacity: 1;
  }

  /* ==========================================================================
     Search View
     ========================================================================== */

  .search-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .global-search-form {
    flex-shrink: 0;
  }

  .global-search-container {
    position: relative;
    width: 100%;
  }

  .global-search-input {
    width: 100%;
    padding: 12px 44px 12px 44px;
    border: none;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
    font-size: 16px;
    font-family: inherit;
    outline: none;
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
  }

  :host([dir="rtl"]) .global-search-input {
    padding: 12px 44px 12px 44px;
  }

  .global-search-input::placeholder {
    color: var(--secondary-text-color);
  }

  .global-search-input:focus {
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .global-search-container .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    pointer-events: none;
  }

  :host([dir="rtl"]) .global-search-container .search-icon {
    left: auto;
    right: 14px;
  }

  .search-clear-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    padding: 6px;
    cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([dir="rtl"]) .search-clear-button {
    right: auto;
    left: 8px;
  }

  .search-clear-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .search-clear-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .search-type-filters {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .search-type-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1;
    padding: 10px 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border: none;
    border-radius: 10px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .search-type-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .search-type-button.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }

  .search-type-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .search-results {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  .search-results::-webkit-scrollbar {
    width: 6px;
  }

  .search-results::-webkit-scrollbar-track {
    background: transparent;
  }

  .search-results::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .search-results::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  .search-result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border-radius: 10px;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  .search-result-item:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .search-result-image {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .search-result-image ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .search-result-info {
    flex: 1;
    min-width: 0;
  }

  .search-result-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-result-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-result-album {
    font-size: 11px;
    color: var(--secondary-text-color);
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-result-favorite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
    pointer-events: auto;
  }

  .search-result-item:hover .search-result-favorite {
    opacity: 0.8;
  }

  .search-result-favorite:hover {
    opacity: 1;
    transform: scale(1.15);
    color: var(--error-color, #e91e63);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .search-result-favorite.active {
    opacity: 1;
    color: var(--error-color, #e91e63);
  }

  .search-result-favorite.active:hover {
    transform: scale(1.15);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .search-result-favorite ha-icon {
    --mdc-icon-size: 22px;
    pointer-events: none;
  }

  .search-result-play {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    color: var(--text-primary-color, #fff);
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
    pointer-events: auto;
  }

  .search-result-item:hover .search-result-play {
    opacity: 1;
  }

  .search-result-play:hover {
    transform: scale(1.1);
  }

  .search-result-play ha-icon {
    --mdc-icon-size: 20px;
    pointer-events: none;
  }

  .search-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 24px;
    color: var(--secondary-text-color);
    flex: 1;
  }

  .search-empty ha-icon {
    --mdc-icon-size: 48px;
    opacity: 0.3;
  }

  /* Load More Indicator */
  .load-more-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .loading-spinner.small {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }

  /* End of List */
  .end-of-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    color: var(--secondary-text-color);
    font-size: 12px;
    opacity: 0.6;
  }

  /* Artist Image (rounded) */
  .search-result-image.artist-image {
    border-radius: 50%;
  }

  .search-result-image.artist-image img {
    border-radius: 50%;
  }

  /* ==========================================================================
     Queue View (requires mass_queue integration)
     ========================================================================== */

  .queue-view {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .queue-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    flex-shrink: 0;
  }

  .queue-count {
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .refresh-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    transition: all 0.2s ease;
  }

  .refresh-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
  }

  .refresh-button ha-icon {
    --mdc-icon-size: 20px;
  }

  .queue-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  .queue-list::-webkit-scrollbar {
    width: 6px;
  }

  .queue-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .queue-list::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .queue-list::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  .queue-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  :host([dir="rtl"]) .queue-item {
    flex-direction: row-reverse;
  }

  .queue-item:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .queue-item.now-playing {
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  }

  .queue-item-number {
    width: 24px;
    font-size: 12px;
    color: var(--secondary-text-color);
    text-align: center;
    flex-shrink: 0;
  }

  .queue-item.now-playing .queue-item-number {
    color: var(--primary-color);
    font-weight: 600;
  }

  .queue-item-image {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .queue-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .queue-item-image ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .now-playing-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .now-playing-indicator ha-icon {
    --mdc-icon-size: 20px;
    color: var(--primary-color);
    opacity: 1;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .queue-item-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  :host([dir="rtl"]) .queue-item-info {
    text-align: right;
  }

  .queue-item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item.now-playing .queue-item-title {
    color: var(--primary-color);
  }

  .queue-item-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-album {
    font-size: 11px;
    color: var(--secondary-text-color);
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }

  .queue-item:hover .queue-item-actions {
    opacity: 1;
  }

  .queue-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    transition: all 0.2s ease;
  }

  .queue-action-btn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
  }

  .queue-action-btn.remove:hover {
    background: color-mix(in srgb, var(--error-color, #db4437) 20%, transparent);
    color: var(--error-color, #db4437);
  }

  .queue-action-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ==========================================================================
     Playlist Detail View
     ========================================================================== */

  .playlist-detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .playlist-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  :host([dir="rtl"]) .playlist-detail-header {
    flex-direction: row-reverse;
  }

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border: none;
    cursor: pointer;
    color: var(--primary-text-color);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .back-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .back-button ha-icon {
    --mdc-icon-size: 24px;
  }

  :host([dir="rtl"]) .back-button ha-icon {
    transform: rotate(180deg);
  }

  .playlist-detail-image {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playlist-detail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .playlist-detail-image ha-icon {
    --mdc-icon-size: 28px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .playlist-detail-info {
    flex: 1;
    min-width: 0;
  }

  :host([dir="rtl"]) .playlist-detail-info {
    text-align: right;
  }

  .playlist-detail-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
    margin: 0 0 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playlist-detail-meta {
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .playlist-detail-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .play-all-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 20px;
    background: var(--primary-color);
    border: none;
    border-radius: 12px;
    color: var(--text-primary-color, #fff);
    font-size: 15px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .play-all-button:hover {
    filter: brightness(1.1);
  }

  .play-all-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .play-all-button ha-icon {
    --mdc-icon-size: 22px;
  }

  .tracks-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  .tracks-list::-webkit-scrollbar {
    width: 6px;
  }

  .tracks-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .tracks-list::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .tracks-list::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  .track-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  :host([dir="rtl"]) .track-item {
    flex-direction: row-reverse;
  }

  .track-item:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .track-number {
    width: 24px;
    font-size: 13px;
    color: var(--secondary-text-color);
    text-align: center;
    flex-shrink: 0;
  }

  :host([dir="rtl"]) .track-number {
    text-align: center;
  }

  .track-image {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .track-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .track-image ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .track-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  :host([dir="rtl"]) .track-info {
    text-align: right;
  }

  .track-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-duration {
    font-size: 12px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  .track-play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    color: var(--text-primary-color, #fff);
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
  }

  .track-item:hover .track-play-btn {
    opacity: 1;
  }

  .track-play-btn:hover {
    transform: scale(1.1);
  }

  .track-play-btn ha-icon {
    --mdc-icon-size: 18px;
  }

`,_e=o`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .form-row {
    margin-bottom: 16px;
  }

  .form-row:last-child {
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin-bottom: 8px;
  }

  ha-textfield,
  ha-select,
  ha-form,
  ha-selector {
    width: 100%;
    display: block;
  }

  ha-formfield {
    display: block;
    margin: 8px 0;
  }

  .speakers-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }

  .speaker-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    font-size: 14px;
  }

  .speaker-chip ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }

  .speaker-chip .remove-btn {
    margin-left: auto;
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .speaker-chip .remove-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    color: var(--error-color, #db4437);
  }

  .add-speaker-row {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    align-items: flex-end;
  }

  .add-speaker-row ha-selector {
    flex: 1;
  }
  
  .add-speaker-row mwc-button {
    margin-bottom: 4px;
  }

  .section-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin: 24px 0 12px;
    letter-spacing: 0.5px;
  }

  .section-title:first-child {
    margin-top: 0;
  }

  .helper-text {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-top: 4px;
    opacity: 0.8;
  }

  /* Preview Mode Styles */
  .preview-artwork {
    background: linear-gradient(135deg, var(--primary-color) 0%, #667eea 50%, #764ba2 100%) !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-gradient {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-gradient ha-icon {
    --mdc-icon-size: 80px;
    color: rgba(255, 255, 255, 0.9);
  }
`;var ge={now_playing:"Now Playing",playlists:"Playlists",queue:"Queue",search:"Search",speakers:"Speakers"},ye={loading:"Loading...",error:"An error occurred",no_playlists:"No playlists found",play:"Play",select_speaker:"Select Speaker",no_speaker_selected:"No speaker selected",nothing_playing:"Nothing is currently playing",search:"Search",search_playlists:"Search playlists...",search_placeholder:"Search for songs, albums, artists...",search_hint:"Search for music to play",browse_library:"Browse your music library",end_of_list:"End of list",tracks:"Tracks",albums:"Albums",artists:"Artists",favorites:"Favorites",add_favorite:"Add to favorites",remove_favorite:"Remove from favorites",all:"All",sort:"Sort",sort_name:"Name (A-Z)",sort_name_desc:"Name (Z-A)",sort_tracks:"Track count",sort_recent:"Recently added",view_grid:"Grid view",view_list:"List view",no_results:"No results found",play_all:"Play All",back:"Back",no_tracks:"No tracks found",queue_empty:"Queue is empty",queue_error:"Failed to load queue",remove_from_queue:"Remove from queue",move_up:"Move up",move_down:"Move down",play_next:"Play next",now_playing_label:"Now Playing"},fe={title:"Card Title",config_entry_id:"Music Assistant Instance",config_entry_helper:"Select your Music Assistant instance. This is filled automatically when only one instance is installed.",speakers:"Speakers",speakers_helper:"Select Music Assistant player entities, not the original speaker from another integration.",limit:"Number of Playlists",card_height:"Card Height (px)",card_height_helper:"Smaller height = smaller artwork",columns:"Columns",columns_auto:"Auto",favorites_only:"Favorites Only",language:"Language",language_auto:"Auto (from Home Assistant)"},ve={missing_config:"Missing configuration. Please configure the card.",missing_speakers:"No speakers configured. Please add speakers in card settings.",load_failed:"Failed to load playlists. Please check your Music Assistant configuration.",play_failed:"Failed to play playlist"},be={tabs:ge,common:ye,config:fe,error:ve},xe={now_playing:"מתנגן עכשיו",playlists:"פלייליסטים",queue:"תור",search:"חיפוש",speakers:"רמקולים"},ke={loading:"טוען...",error:"אירעה שגיאה",no_playlists:"לא נמצאו פלייליסטים",play:"הפעל",select_speaker:"בחר רמקול",no_speaker_selected:"לא נבחר רמקול",nothing_playing:"אין כרגע מוזיקה מתנגנת",search:"חיפוש",search_playlists:"חפש פלייליסטים...",search_placeholder:"חפש שירים, אלבומים, אמנים...",search_hint:"חפש מוזיקה להשמעה",browse_library:"דפדף בספריית המוזיקה שלך",end_of_list:"סוף הרשימה",tracks:"שירים",albums:"אלבומים",artists:"אמנים",favorites:"מועדפים",add_favorite:"הוסף למועדפים",remove_favorite:"הסר מהמועדפים",all:"הכל",sort:"מיון",sort_name:"שם (א-ת)",sort_name_desc:"שם (ת-א)",sort_tracks:"מספר שירים",sort_recent:"נוספו לאחרונה",view_grid:"תצוגת רשת",view_list:"תצוגת רשימה",no_results:"לא נמצאו תוצאות",play_all:"נגן הכל",back:"חזור",no_tracks:"לא נמצאו שירים",queue_empty:"התור ריק",queue_error:"שגיאה בטעינת התור",remove_from_queue:"הסר מהתור",move_up:"הזז למעלה",move_down:"הזז למטה",play_next:"נגן הבא",now_playing_label:"מתנגן עכשיו"},we={title:"כותרת הכרטיס",config_entry_id:"מופע Music Assistant",config_entry_helper:"בחר את מופע Music Assistant. אם מותקן מופע אחד בלבד, השדה יתמלא אוטומטית.",speakers:"רמקולים",speakers_helper:"בחר ישויות נגן של Music Assistant, לא את הרמקול המקורי מאינטגרציה אחרת.",limit:"מספר פלייליסטים",card_height:"גובה הכרטיס (פיקסלים)",card_height_helper:"גובה קטן יותר = תמונה קטנה יותר",columns:"עמודות",columns_auto:"אוטומטי",favorites_only:"מועדפים בלבד",language:"שפה",language_auto:"אוטומטי (מ-Home Assistant)"},$e={missing_config:"חסרה הגדרה. אנא הגדר את הכרטיס.",missing_speakers:"לא הוגדרו רמקולים. אנא הוסף רמקולים בהגדרות הכרטיס.",load_failed:"נכשל בטעינת פלייליסטים. אנא בדוק את הגדרות Music Assistant.",play_failed:"נכשל בהפעלת הפלייליסט"},Ae={tabs:xe,common:ke,config:we,error:$e},Se={now_playing:"قيد التشغيل",playlists:"قوائم التشغيل",queue:"قائمة الانتظار",search:"بحث",speakers:"مكبرات الصوت"},ze={loading:"جاري التحميل...",error:"حدث خطأ",no_playlists:"لم يتم العثور على قوائم تشغيل",play:"تشغيل",select_speaker:"اختر مكبر الصوت",no_speaker_selected:"لم يتم اختيار مكبر صوت",nothing_playing:"لا يوجد شيء قيد التشغيل حالياً",search:"بحث",search_playlists:"البحث في قوائم التشغيل...",search_placeholder:"البحث عن أغاني، ألبومات، فنانين...",search_hint:"ابحث عن موسيقى لتشغيلها",browse_library:"تصفح مكتبة الموسيقى الخاصة بك",end_of_list:"نهاية القائمة",tracks:"أغاني",albums:"ألبومات",artists:"فنانين",favorites:"المفضلة",add_favorite:"إضافة إلى المفضلة",remove_favorite:"إزالة من المفضلة",all:"الكل",sort:"ترتيب",sort_name:"الاسم (أ-ي)",sort_name_desc:"الاسم (ي-أ)",sort_tracks:"عدد المقاطع",sort_recent:"المضافة حديثاً",view_grid:"عرض شبكي",view_list:"عرض قائمة",no_results:"لا توجد نتائج",play_all:"تشغيل الكل",back:"رجوع",no_tracks:"لم يتم العثور على أغاني",queue_empty:"قائمة الانتظار فارغة",queue_error:"فشل تحميل قائمة الانتظار",remove_from_queue:"إزالة من قائمة الانتظار",move_up:"تحريك للأعلى",move_down:"تحريك للأسفل",play_next:"تشغيل التالي",now_playing_label:"قيد التشغيل الآن"},qe={title:"عنوان البطاقة",config_entry_id:"مثيل Music Assistant",config_entry_helper:"اختر مثيل Music Assistant. يُملأ الحقل تلقائيًا إذا كان هناك مثيل واحد فقط.",speakers:"مكبرات الصوت",speakers_helper:"اختر مشغلات Music Assistant، وليس مكبر الصوت الأصلي من تكامل آخر.",limit:"عدد قوائم التشغيل",card_height:"ارتفاع البطاقة (بكسل)",card_height_helper:"ارتفاع أقل = صورة أصغر",columns:"الأعمدة",columns_auto:"تلقائي",favorites_only:"المفضلة فقط",language:"اللغة",language_auto:"تلقائي (من Home Assistant)"},Me={missing_config:"الإعدادات مفقودة. يرجى تهيئة البطاقة.",missing_speakers:"لم يتم تهيئة مكبرات الصوت. يرجى إضافة مكبرات صوت.",load_failed:"فشل تحميل قوائم التشغيل. يرجى التحقق من إعدادات Music Assistant.",play_failed:"فشل تشغيل قائمة التشغيل"},Pe={tabs:Se,common:ze,config:qe,error:Me},Ee={now_playing:"Läuft gerade",playlists:"Wiedergabelisten",queue:"Warteschlange",search:"Suche",speakers:"Lautsprecher"},je={loading:"Laden...",error:"Ein Fehler ist aufgetreten",no_playlists:"Keine Wiedergabelisten gefunden",play:"Abspielen",select_speaker:"Lautsprecher auswählen",no_speaker_selected:"Kein Lautsprecher ausgewählt",nothing_playing:"Es wird derzeit nichts abgespielt",search:"Suchen",search_playlists:"Wiedergabelisten suchen...",search_placeholder:"Lieder, Alben, Künstler suchen...",search_hint:"Nach Musik zum Abspielen suchen",browse_library:"Durchstöbere deine Musikbibliothek",end_of_list:"Ende der Liste",tracks:"Titel",albums:"Alben",artists:"Künstler",favorites:"Favoriten",add_favorite:"Zu Favoriten hinzufügen",remove_favorite:"Aus Favoriten entfernen",all:"Alle",sort:"Sortieren",sort_name:"Name (A-Z)",sort_name_desc:"Name (Z-A)",sort_tracks:"Anzahl Titel",sort_recent:"Kürzlich hinzugefügt",view_grid:"Rasteransicht",view_list:"Listenansicht",no_results:"Keine Ergebnisse gefunden",play_all:"Alle abspielen",back:"Zurück",no_tracks:"Keine Titel gefunden",queue_empty:"Warteschlange ist leer",queue_error:"Fehler beim Laden der Warteschlange",remove_from_queue:"Aus Warteschlange entfernen",move_up:"Nach oben verschieben",move_down:"Nach unten verschieben",play_next:"Als Nächstes abspielen",now_playing_label:"Wird gerade abgespielt"},Te={title:"Kartentitel",config_entry_id:"Music Assistant Instanz",config_entry_helper:"Wählen Sie Ihre Music Assistant-Instanz. Bei nur einer Installation wird das Feld automatisch ausgefüllt.",speakers:"Lautsprecher",speakers_helper:"Wählen Sie Music Assistant-Player, nicht den ursprünglichen Lautsprecher einer anderen Integration.",limit:"Anzahl der Wiedergabelisten",card_height:"Kartenhöhe (px)",card_height_helper:"Kleinere Höhe = kleineres Artwork",columns:"Spalten",columns_auto:"Automatisch",favorites_only:"Nur Favoriten",language:"Sprache",language_auto:"Automatisch (von Home Assistant)"},Ce={missing_config:"Konfiguration fehlt. Bitte konfigurieren Sie die Karte.",missing_speakers:"Keine Lautsprecher konfiguriert. Bitte fügen Sie Lautsprecher hinzu.",load_failed:"Wiedergabelisten konnten nicht geladen werden. Überprüfen Sie die Music Assistant Konfiguration.",play_failed:"Wiedergabeliste konnte nicht abgespielt werden"},Ie={tabs:Ee,common:je,config:Te,error:Ce},Ne={now_playing:"En cours",playlists:"Playlists",queue:"File d'attente",search:"Recherche",speakers:"Enceintes"},Le={loading:"Chargement...",error:"Une erreur s'est produite",no_playlists:"Aucune playlist trouvée",play:"Lecture",select_speaker:"Sélectionner un haut-parleur",no_speaker_selected:"Aucun haut-parleur sélectionné",nothing_playing:"Rien n'est en cours de lecture",search:"Rechercher",search_playlists:"Rechercher des playlists...",search_placeholder:"Rechercher chansons, albums, artistes...",search_hint:"Rechercher de la musique à jouer",browse_library:"Parcourir votre bibliothèque musicale",end_of_list:"Fin de la liste",tracks:"Pistes",albums:"Albums",artists:"Artistes",favorites:"Favoris",add_favorite:"Ajouter aux favoris",remove_favorite:"Retirer des favoris",all:"Tout",sort:"Trier",sort_name:"Nom (A-Z)",sort_name_desc:"Nom (Z-A)",sort_tracks:"Nombre de pistes",sort_recent:"Ajoutés récemment",view_grid:"Vue grille",view_list:"Vue liste",no_results:"Aucun résultat trouvé",play_all:"Tout lire",back:"Retour",no_tracks:"Aucune piste trouvée",queue_empty:"File d'attente vide",queue_error:"Échec du chargement de la file d'attente",remove_from_queue:"Retirer de la file d'attente",move_up:"Déplacer vers le haut",move_down:"Déplacer vers le bas",play_next:"Lire ensuite",now_playing_label:"En lecture"},Oe={title:"Titre de la carte",config_entry_id:"Instance Music Assistant",config_entry_helper:"Sélectionnez votre instance Music Assistant. Le champ est rempli automatiquement s'il n'y en a qu'une.",speakers:"Enceintes",speakers_helper:"Sélectionnez les lecteurs Music Assistant, pas l'enceinte d'origine d'une autre intégration.",limit:"Nombre de playlists",card_height:"Hauteur de la carte (px)",card_height_helper:"Hauteur réduite = image réduite",columns:"Colonnes",columns_auto:"Automatique",favorites_only:"Favoris uniquement",language:"Langue",language_auto:"Automatique (depuis Home Assistant)"},Re={missing_config:"Configuration manquante. Veuillez configurer la carte.",missing_speakers:"Aucun haut-parleur configuré. Veuillez ajouter des haut-parleurs.",load_failed:"Échec du chargement des playlists. Vérifiez la configuration de Music Assistant.",play_failed:"Échec de la lecture de la playlist"},He={tabs:Ne,common:Le,config:Oe,error:Re},Fe={now_playing:"Reproduciendo",playlists:"Listas",queue:"Cola",search:"Buscar",speakers:"Altavoces"},Qe={loading:"Cargando...",error:"Se produjo un error",no_playlists:"No se encontraron listas de reproducción",play:"Reproducir",select_speaker:"Seleccionar altavoz",no_speaker_selected:"Ningún altavoz seleccionado",nothing_playing:"No se está reproduciendo nada",search:"Buscar",search_playlists:"Buscar listas...",search_placeholder:"Buscar canciones, álbumes, artistas...",search_hint:"Buscar música para reproducir",browse_library:"Explorar tu biblioteca de música",end_of_list:"Fin de la lista",tracks:"Pistas",albums:"Álbumes",artists:"Artistas",favorites:"Favoritos",add_favorite:"Añadir a favoritos",remove_favorite:"Eliminar de favoritos",all:"Todo",sort:"Ordenar",sort_name:"Nombre (A-Z)",sort_name_desc:"Nombre (Z-A)",sort_tracks:"Número de pistas",sort_recent:"Añadidos recientemente",view_grid:"Vista cuadrícula",view_list:"Vista lista",no_results:"No se encontraron resultados",play_all:"Reproducir todo",back:"Volver",no_tracks:"No se encontraron pistas",queue_empty:"La cola está vacía",queue_error:"Error al cargar la cola",remove_from_queue:"Eliminar de la cola",move_up:"Mover arriba",move_down:"Mover abajo",play_next:"Reproducir siguiente",now_playing_label:"Reproduciendo ahora"},Ue={title:"Título de la tarjeta",config_entry_id:"Instancia de Music Assistant",config_entry_helper:"Seleccione su instancia de Music Assistant. Se completa automáticamente si solo hay una instalada.",speakers:"Altavoces",speakers_helper:"Seleccione reproductores de Music Assistant, no el altavoz original de otra integración.",limit:"Número de listas de reproducción",card_height:"Altura de la tarjeta (px)",card_height_helper:"Menor altura = imagen más pequeña",columns:"Columnas",columns_auto:"Automático",favorites_only:"Solo favoritos",language:"Idioma",language_auto:"Automático (desde Home Assistant)"},De={missing_config:"Falta la configuración. Por favor, configure la tarjeta.",missing_speakers:"No hay altavoces configurados. Por favor, agregue altavoces.",load_failed:"Error al cargar las listas de reproducción. Verifique la configuración de Music Assistant.",play_failed:"Error al reproducir la lista de reproducción"},We={tabs:Fe,common:Qe,config:Ue,error:De},Ve={now_playing:"In riproduzione",playlists:"Playlist",queue:"Coda",search:"Cerca",speakers:"Altoparlanti"},Ke={loading:"Caricamento...",error:"Si è verificato un errore",no_playlists:"Nessuna playlist trovata",play:"Riproduci",select_speaker:"Seleziona altoparlante",no_speaker_selected:"Nessun altoparlante selezionato",nothing_playing:"Nessuna riproduzione in corso",search:"Cerca",search_playlists:"Cerca playlist...",search_placeholder:"Cerca brani, album, artisti...",search_hint:"Cerca musica da riprodurre",browse_library:"Sfoglia la tua libreria musicale",end_of_list:"Fine della lista",tracks:"Brani",albums:"Album",artists:"Artisti",favorites:"Preferiti",add_favorite:"Aggiungi ai preferiti",remove_favorite:"Rimuovi dai preferiti",all:"Tutti",sort:"Ordina",sort_name:"Nome (A-Z)",sort_name_desc:"Nome (Z-A)",sort_tracks:"Numero di tracce",sort_recent:"Aggiunti di recente",view_grid:"Vista griglia",view_list:"Vista elenco",no_results:"Nessun risultato trovato",play_all:"Riproduci tutto",back:"Indietro",no_tracks:"Nessun brano trovato",queue_empty:"Coda vuota",queue_error:"Impossibile caricare la coda",remove_from_queue:"Rimuovi dalla coda",move_up:"Sposta in alto",move_down:"Sposta in basso",play_next:"Riproduci dopo",now_playing_label:"In riproduzione ora"},Be={title:"Titolo scheda",config_entry_id:"Istanza Music Assistant",config_entry_helper:"Seleziona l'istanza di Music Assistant. Il campo viene compilato automaticamente se ne è installata solo una.",speakers:"Altoparlanti",speakers_helper:"Seleziona i player di Music Assistant, non l'altoparlante originale di un'altra integrazione.",limit:"Numero di playlist",card_height:"Altezza scheda (px)",card_height_helper:"Altezza minore = immagine più piccola",columns:"Colonne",columns_auto:"Auto",favorites_only:"Solo preferiti",language:"Lingua",language_auto:"Auto (da Home Assistant)"},Ze={missing_config:"Configurazione mancante. Configura la scheda.",missing_speakers:"Nessun altoparlante configurato. Aggiungi altoparlanti.",load_failed:"Impossibile caricare le playlist. Controlla la configurazione di Music Assistant.",play_failed:"Impossibile riprodurre la playlist"},Ge={tabs:Ve,common:Ke,config:Be,error:Ze},Je={now_playing:"Tocando agora",playlists:"Playlists",queue:"Fila",search:"Pesquisar",speakers:"Alto-falantes"},Ye={loading:"Carregando...",error:"Ocorreu um erro",no_playlists:"Nenhuma playlist encontrada",play:"Reproduzir",select_speaker:"Selecionar alto-falante",no_speaker_selected:"Nenhum alto-falante selecionado",nothing_playing:"Nada está tocando no momento",search:"Pesquisar",search_playlists:"Pesquisar playlists...",search_placeholder:"Pesquisar músicas, álbuns, artistas...",search_hint:"Pesquisar música para tocar",browse_library:"Navegar pela sua biblioteca de música",end_of_list:"Fim da lista",tracks:"Faixas",albums:"Álbuns",artists:"Artistas",favorites:"Favoritos",add_favorite:"Adicionar aos favoritos",remove_favorite:"Remover dos favoritos",all:"Todos",sort:"Ordenar",sort_name:"Nome (A-Z)",sort_name_desc:"Nome (Z-A)",sort_tracks:"Número de faixas",sort_recent:"Adicionados recentemente",view_grid:"Visualização em grade",view_list:"Visualização em lista",no_results:"Nenhum resultado encontrado",play_all:"Reproduzir tudo",back:"Voltar",no_tracks:"Nenhuma faixa encontrada",queue_empty:"Fila vazia",queue_error:"Falha ao carregar a fila",remove_from_queue:"Remover da fila",move_up:"Mover para cima",move_down:"Mover para baixo",play_next:"Tocar em seguida",now_playing_label:"Tocando agora"},Xe={title:"Título do cartão",config_entry_id:"Instância do Music Assistant",config_entry_helper:"Selecione a instância do Music Assistant. O campo é preenchido automaticamente se houver apenas uma.",speakers:"Alto-falantes",speakers_helper:"Selecione os players do Music Assistant, não o alto-falante original de outra integração.",limit:"Número de playlists",card_height:"Altura do cartão (px)",card_height_helper:"Altura menor = imagem menor",columns:"Colunas",columns_auto:"Auto",favorites_only:"Apenas favoritos",language:"Idioma",language_auto:"Auto (do Home Assistant)"},et={missing_config:"Configuração ausente. Configure o cartão.",missing_speakers:"Nenhum alto-falante configurado. Adicione alto-falantes.",load_failed:"Falha ao carregar playlists. Verifique a configuração do Music Assistant.",play_failed:"Falha ao reproduzir a playlist"},tt={tabs:Je,common:Ye,config:Xe,error:et},it={now_playing:"Nu speelt",playlists:"Afspeellijsten",queue:"Wachtrij",search:"Zoeken",speakers:"Luidsprekers"},at={loading:"Laden...",error:"Er is een fout opgetreden",no_playlists:"Geen afspeellijsten gevonden",play:"Afspelen",select_speaker:"Speaker selecteren",no_speaker_selected:"Geen speaker geselecteerd",nothing_playing:"Er wordt momenteel niets afgespeeld",search:"Zoeken",search_playlists:"Afspeellijsten zoeken...",search_placeholder:"Zoek nummers, albums, artiesten...",search_hint:"Zoek muziek om af te spelen",browse_library:"Blader door je muziekbibliotheek",end_of_list:"Einde van de lijst",tracks:"Nummers",albums:"Albums",artists:"Artiesten",favorites:"Favorieten",add_favorite:"Toevoegen aan favorieten",remove_favorite:"Verwijderen uit favorieten",all:"Alles",sort:"Sorteren",sort_name:"Naam (A-Z)",sort_name_desc:"Naam (Z-A)",sort_tracks:"Aantal nummers",sort_recent:"Recent toegevoegd",view_grid:"Rasterweergave",view_list:"Lijstweergave",no_results:"Geen resultaten gevonden",play_all:"Alles afspelen",back:"Terug",no_tracks:"Geen nummers gevonden",queue_empty:"Wachtrij is leeg",queue_error:"Kan wachtrij niet laden",remove_from_queue:"Verwijderen uit wachtrij",move_up:"Omhoog verplaatsen",move_down:"Omlaag verplaatsen",play_next:"Hierna afspelen",now_playing_label:"Speelt nu"},st={title:"Kaarttitel",config_entry_id:"Music Assistant instantie",config_entry_helper:"Selecteer je Music Assistant-instantie. Dit veld wordt automatisch ingevuld als er maar één is geïnstalleerd.",speakers:"Speakers",speakers_helper:"Selecteer Music Assistant-spelers, niet de oorspronkelijke speaker van een andere integratie.",limit:"Aantal afspeellijsten",card_height:"Kaarthoogte (px)",card_height_helper:"Kleinere hoogte = kleinere afbeelding",columns:"Kolommen",columns_auto:"Automatisch",favorites_only:"Alleen favorieten",language:"Taal",language_auto:"Automatisch (van Home Assistant)"},rt={missing_config:"Configuratie ontbreekt. Configureer de kaart.",missing_speakers:"Geen speakers geconfigureerd. Voeg speakers toe.",load_failed:"Kan afspeellijsten niet laden. Controleer de Music Assistant configuratie.",play_failed:"Kan afspeellijst niet afspelen"},ot={tabs:it,common:at,config:st,error:rt},nt={now_playing:"Сейчас играет",playlists:"Плейлисты",queue:"Очередь",search:"Поиск",speakers:"Колонки"},lt={loading:"Загрузка...",error:"Произошла ошибка",no_playlists:"Плейлисты не найдены",play:"Воспроизвести",select_speaker:"Выбрать колонку",no_speaker_selected:"Колонка не выбрана",nothing_playing:"Сейчас ничего не воспроизводится",search:"Поиск",search_playlists:"Поиск плейлистов...",search_placeholder:"Поиск песен, альбомов, исполнителей...",search_hint:"Поиск музыки для воспроизведения",browse_library:"Просмотр вашей музыкальной библиотеки",end_of_list:"Конец списка",tracks:"Треки",albums:"Альбомы",artists:"Исполнители",favorites:"Избранное",add_favorite:"Добавить в избранное",remove_favorite:"Удалить из избранного",all:"Все",sort:"Сортировка",sort_name:"Имя (А-Я)",sort_name_desc:"Имя (Я-А)",sort_tracks:"Количество треков",sort_recent:"Недавно добавленные",view_grid:"Сетка",view_list:"Список",no_results:"Результаты не найдены",play_all:"Воспроизвести все",back:"Назад",no_tracks:"Треки не найдены",queue_empty:"Очередь пуста",queue_error:"Не удалось загрузить очередь",remove_from_queue:"Удалить из очереди",move_up:"Переместить вверх",move_down:"Переместить вниз",play_next:"Воспроизвести следующим",now_playing_label:"Сейчас играет"},ct={title:"Заголовок карточки",config_entry_id:"Экземпляр Music Assistant",config_entry_helper:"Выберите экземпляр Music Assistant. Поле заполняется автоматически, если установлен только один.",speakers:"Колонки",speakers_helper:"Выберите проигрыватели Music Assistant, а не исходную колонку из другой интеграции.",limit:"Количество плейлистов",card_height:"Высота карточки (px)",card_height_helper:"Меньше высота = меньше обложка",columns:"Столбцы",columns_auto:"Авто",favorites_only:"Только избранное",language:"Язык",language_auto:"Авто (из Home Assistant)"},dt={missing_config:"Отсутствует конфигурация. Настройте карточку.",missing_speakers:"Колонки не настроены. Добавьте колонки в настройках.",load_failed:"Не удалось загрузить плейлисты. Проверьте настройки Music Assistant.",play_failed:"Не удалось воспроизвести плейлист"},pt={tabs:nt,common:lt,config:ct,error:dt},ut={now_playing:"Teraz gra",playlists:"Playlisty",queue:"Kolejka",search:"Szukaj",speakers:"Głośniki"},ht={loading:"Ładowanie...",error:"Wystąpił błąd",no_playlists:"Nie znaleziono playlist",play:"Odtwórz",select_speaker:"Wybierz głośnik",no_speaker_selected:"Nie wybrano głośnika",nothing_playing:"Nic nie jest obecnie odtwarzane",search:"Szukaj",search_playlists:"Szukaj playlist...",search_placeholder:"Szukaj utworów, albumów, artystów...",search_hint:"Wyszukaj muzykę do odtworzenia",browse_library:"Przeglądaj swoją bibliotekę muzyki",end_of_list:"Koniec listy",tracks:"Utwory",albums:"Albumy",artists:"Artyści",favorites:"Ulubione",add_favorite:"Dodaj do ulubionych",remove_favorite:"Usuń z ulubionych",all:"Wszystkie",sort:"Sortuj",sort_name:"Nazwa (A-Z)",sort_name_desc:"Nazwa (Z-A)",sort_tracks:"Liczba utworów",sort_recent:"Ostatnio dodane",view_grid:"Widok siatki",view_list:"Widok listy",no_results:"Brak wyników",play_all:"Odtwórz wszystko",back:"Wstecz",no_tracks:"Nie znaleziono utworów",queue_empty:"Kolejka jest pusta",queue_error:"Nie udało się załadować kolejki",remove_from_queue:"Usuń z kolejki",move_up:"Przenieś w górę",move_down:"Przenieś w dół",play_next:"Odtwórz następny",now_playing_label:"Teraz gra"},mt={title:"Tytuł karty",config_entry_id:"Instancja Music Assistant",config_entry_helper:"Wybierz instancję Music Assistant. Pole zostanie wypełnione automatycznie, jeśli jest tylko jedna.",speakers:"Głośniki",speakers_helper:"Wybierz odtwarzacze Music Assistant, a nie oryginalny głośnik z innej integracji.",limit:"Liczba playlist",card_height:"Wysokość karty (px)",card_height_helper:"Mniejsza wysokość = mniejsza okładka",columns:"Kolumny",columns_auto:"Auto",favorites_only:"Tylko ulubione",language:"Język",language_auto:"Auto (z Home Assistant)"},_t={missing_config:"Brak konfiguracji. Skonfiguruj kartę.",missing_speakers:"Nie skonfigurowano głośników. Dodaj głośniki.",load_failed:"Nie udało się załadować playlist. Sprawdź konfigurację Music Assistant.",play_failed:"Nie udało się odtworzyć playlisty"},gt={tabs:ut,common:ht,config:mt,error:_t},yt={now_playing:"正在播放",playlists:"播放列表",queue:"播放队列",search:"搜索",speakers:"扬声器"},ft={loading:"正在加载...",error:"发生错误",no_playlists:"未找到播放列表",play:"播放",select_speaker:"选择扬声器",no_speaker_selected:"未选择扬声器",nothing_playing:"当前没有播放内容",search:"搜索",search_playlists:"搜索播放列表...",search_placeholder:"搜索歌曲、专辑、艺术家...",search_hint:"搜索要播放的音乐",browse_library:"浏览你的音乐库",end_of_list:"列表结束",tracks:"歌曲",albums:"专辑",artists:"艺术家",favorites:"收藏",add_favorite:"添加到收藏",remove_favorite:"从收藏中移除",all:"全部",sort:"排序",sort_name:"名称 (A-Z)",sort_name_desc:"名称 (Z-A)",sort_tracks:"曲目数量",sort_recent:"最近添加",view_grid:"网格视图",view_list:"列表视图",no_results:"未找到结果",play_all:"全部播放",back:"返回",no_tracks:"未找到歌曲",queue_empty:"播放队列为空",queue_error:"无法加载播放队列",remove_from_queue:"从队列中移除",move_up:"上移",move_down:"下移",play_next:"下一首播放",now_playing_label:"正在播放"},vt={title:"卡片标题",config_entry_id:"Music Assistant 实例",config_entry_helper:"选择 Music Assistant 实例。如果只安装了一个实例，将自动填写。",speakers:"扬声器",speakers_helper:"请选择 Music Assistant 播放器实体，而不是其他集成中的原始扬声器。",limit:"播放列表数量",card_height:"卡片高度 (px)",card_height_helper:"高度越小 = 封面越小",columns:"列数",columns_auto:"自动",favorites_only:"仅收藏",language:"语言",language_auto:"自动（从 Home Assistant）"},bt={missing_config:"缺少配置。请配置卡片。",missing_speakers:"未配置扬声器。请添加扬声器。",load_failed:"无法加载播放列表。请检查 Music Assistant 配置。",play_failed:"无法播放播放列表"},xt={tabs:yt,common:ft,config:vt,error:bt},kt={now_playing:"再生中",playlists:"プレイリスト",queue:"キュー",search:"検索",speakers:"スピーカー"},wt={loading:"読み込み中...",error:"エラーが発生しました",no_playlists:"プレイリストが見つかりません",play:"再生",select_speaker:"スピーカーを選択",no_speaker_selected:"スピーカーが選択されていません",nothing_playing:"現在再生中のものはありません",search:"検索",search_playlists:"プレイリストを検索...",search_placeholder:"曲、アルバム、アーティストを検索...",search_hint:"再生する音楽を検索",browse_library:"音楽ライブラリを閲覧",end_of_list:"リストの終わり",tracks:"曲",albums:"アルバム",artists:"アーティスト",favorites:"お気に入り",add_favorite:"お気に入りに追加",remove_favorite:"お気に入りから削除",all:"すべて",sort:"並び替え",sort_name:"名前 (A-Z)",sort_name_desc:"名前 (Z-A)",sort_tracks:"トラック数",sort_recent:"最近追加",view_grid:"グリッド表示",view_list:"リスト表示",no_results:"結果が見つかりません",play_all:"すべて再生",back:"戻る",no_tracks:"曲が見つかりません",queue_empty:"キューは空です",queue_error:"キューの読み込みに失敗しました",remove_from_queue:"キューから削除",move_up:"上へ移動",move_down:"下へ移動",play_next:"次に再生",now_playing_label:"再生中"},$t={title:"カードタイトル",config_entry_id:"Music Assistant インスタンス",config_entry_helper:"Music Assistant インスタンスを選択します。1つだけインストールされている場合は自動入力されます。",speakers:"スピーカー",speakers_helper:"他の統合の元のスピーカーではなく、Music Assistant プレーヤーを選択してください。",limit:"プレイリスト数",card_height:"カードの高さ (px)",card_height_helper:"高さを小さく = アートワークを小さく",columns:"列数",columns_auto:"自動",favorites_only:"お気に入りのみ",language:"言語",language_auto:"自動（Home Assistantから）"},At={missing_config:"設定がありません。カードを設定してください。",missing_speakers:"スピーカーが設定されていません。スピーカーを追加してください。",load_failed:"プレイリストの読み込みに失敗しました。Music Assistantの設定を確認してください。",play_failed:"プレイリストの再生に失敗しました"},St={tabs:kt,common:wt,config:$t,error:At};const zt={en:Object.freeze({__proto__:null,common:ye,config:fe,default:be,error:ve,tabs:ge}),he:Object.freeze({__proto__:null,common:ke,config:we,default:Ae,error:$e,tabs:xe}),ar:Object.freeze({__proto__:null,common:ze,config:qe,default:Pe,error:Me,tabs:Se}),de:Object.freeze({__proto__:null,common:je,config:Te,default:Ie,error:Ce,tabs:Ee}),fr:Object.freeze({__proto__:null,common:Le,config:Oe,default:He,error:Re,tabs:Ne}),es:Object.freeze({__proto__:null,common:Qe,config:Ue,default:We,error:De,tabs:Fe}),it:Object.freeze({__proto__:null,common:Ke,config:Be,default:Ge,error:Ze,tabs:Ve}),pt:Object.freeze({__proto__:null,common:Ye,config:Xe,default:tt,error:et,tabs:Je}),nl:Object.freeze({__proto__:null,common:at,config:st,default:ot,error:rt,tabs:it}),ru:Object.freeze({__proto__:null,common:lt,config:ct,default:pt,error:dt,tabs:nt}),pl:Object.freeze({__proto__:null,common:ht,config:mt,default:gt,error:_t,tabs:ut}),zh:Object.freeze({__proto__:null,common:ft,config:vt,default:xt,error:bt,tabs:yt}),ja:Object.freeze({__proto__:null,common:wt,config:$t,default:St,error:At,tabs:kt})},qt=["he","ar"],Mt="en";let Pt=Mt;function Et(e){const t=e.split("-")[0].toLowerCase();Pt=zt[t]?t:Mt}function jt(){return qt.includes(Pt)}function Tt(e,t){const i=t.split(".");let a=e;for(const e of i){if(!a||"object"!=typeof a||!(e in a))return;a=a[e]}return"string"==typeof a?a:void 0}function Ct(e,t){let i=Tt(zt[Pt],e);return i||Pt===Mt||(i=Tt(zt[Mt],e)),i||(console.warn(`[music-assistant-playlist-card] Missing translation for key: ${e}`),e)}const It=[{id:"now-playing",icon:"mdi:music-note",labelKey:"tabs.now_playing"},{id:"playlists",icon:"mdi:playlist-music",labelKey:"tabs.playlists"},{id:"queue",icon:"mdi:playlist-play",labelKey:"tabs.queue",requiresMassQueue:!0},{id:"search",icon:"mdi:magnify",labelKey:"tabs.search"},{id:"speakers",icon:"mdi:speaker",labelKey:"tabs.speakers"}];function Nt(e){if(!e)return[];if(Array.isArray(e))return e;if("object"!=typeof e)return[];const t=e;if(void 0!==t.response){const e=Nt(t.response);if(e.length>0)return e}const i=["items","playlists","tracks","albums","artists"];for(const e of i)if(Array.isArray(t[e]))return t[e];for(const e of Object.values(t)){if(Array.isArray(e))return e;if(e&&"object"==typeof e){const t=Nt(e);if(t.length>0)return t}}return[]}async function Lt(e,t=[]){const i=await e({type:"config/entity_registry/list"});for(const e of t){const t=i.find(t=>t.entity_id===e&&"music_assistant"===t.platform&&t.config_entry_id);if(t?.config_entry_id)return t.config_entry_id}const a=function(e){const t=new Set;for(const i of e)"music_assistant"===i.platform&&i.config_entry_id&&t.add(i.config_entry_id);return[...t]}(i);if(1===a.length)return a[0]}let Ot=class extends ne{constructor(){super(...arguments),this._helpersLoaded=!1,this._computeLabel=e=>Ct(`config.${e.name}`),this._computeHelper=e=>"config_entry_id"===e.name?Ct("config.config_entry_helper"):"speakers"===e.name?Ct("config.speakers_helper"):"card_height"===e.name?Ct("config.card_height_helper"):""}setConfig(e){if(this._config=e,this.hass){const t=e.language;Et(t&&"auto"!==t?t:this.hass.language)}}async firstUpdated(){await this._loadHaComponents(),await this._autoDetectMassInstance()}updated(e){super.updated(e),e.has("hass")&&this.hass&&this._config&&!this._config.config_entry_id&&this._autoDetectMassInstance()}async _loadHaComponents(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return void(this._helpersLoaded=!0);const e=window.loadCardHelpers;try{if(e){const t=await e(),i=await t.createCardElement({type:"entities",entities:[]});await(i?.constructor?.getConfigElement?.())}}catch(e){console.warn("[music-assistant-playlist-card] Could not preload HA form components:",e)}this._helpersLoaded=!0}async _autoDetectMassInstance(){if(this.hass&&this._config&&!this._config.config_entry_id)try{const e=await Lt(this.hass.callWS.bind(this.hass),this._config.speakers||[]);e&&(this._config={...this._config,config_entry_id:e},this._configChanged(this._config))}catch(e){console.warn("[music-assistant-playlist-card] Failed to auto-detect MA instance:",e)}}_configChanged(e){((e,t,i)=>{const a=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,detail:i});e.dispatchEvent(a)})(this,"config-changed",{config:e})}_valueChanged(e){e.stopPropagation();const t=e.detail?.value;if(!t)return;let i="auto";const a=t.columns;if("auto"===a||null==a||""===a)i="auto";else{const e="number"==typeof a?a:parseInt(String(a),10);i=Number.isNaN(e)?"auto":e}const s=Array.isArray(t.speakers)?t.speakers.filter(e=>"string"==typeof e&&e.length>0):"string"==typeof t.speakers&&t.speakers?[t.speakers]:[];this._config={...this._config,...t,type:this._config.type,columns:i,speakers:s},this._configChanged(this._config),!this._config.config_entry_id&&s.length>0&&this._autoDetectMassInstance()}_getSchema(){const e=Object.keys(zt);return[{name:"config_entry_id",required:!0,selector:{config_entry:{integration:"music_assistant"}}},{name:"speakers",required:!0,selector:{entity:{multiple:!0,filter:{domain:"media_player",integration:"music_assistant"}}}},{name:"title",selector:{text:{}}},{name:"limit",selector:{number:{min:1,max:1e3,mode:"box"}}},{name:"card_height",selector:{number:{min:400,max:1e3,mode:"box"}}},{name:"columns",selector:{select:{mode:"dropdown",options:[{value:"auto",label:Ct("config.columns_auto")},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"}]}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"auto",label:Ct("config.language_auto")},...e.map(e=>({value:e,label:e.toUpperCase()}))]}}}]}render(){if(!this.hass||!this._config)return U``;if(!this._helpersLoaded&&!customElements.get("ha-form"))return U`<div class="editor-container">${Ct("common.loading")}</div>`;const e={...this._config,config_entry_id:this._config.config_entry_id||"",speakers:this._config.speakers||[],title:this._config.title||"",limit:this._config.limit??50,card_height:this._config.card_height??680,columns:String(this._config.columns??"auto"),language:this._config.language||"auto"};return U`
      <div class="editor-container">
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${this._getSchema()}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}};Ot.styles=_e,e([ue({attribute:!1})],Ot.prototype,"hass",void 0),e([he()],Ot.prototype,"_config",void 0),e([he()],Ot.prototype,"_helpersLoaded",void 0),Ot=e([ce("music-assistant-playlist-card-editor")],Ot);console.info("%c MUSIC-ASSISTANT-PLAYLIST-CARD %c v1.13.0 ","color: white; background: #7c3aed; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #7c3aed; background: #e9d5ff; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let Rt=class extends ne{constructor(){super(...arguments),this._playlists=[],this._loading=!0,this._error=null,this._selectedSpeaker="",this._activeTab="now-playing",this._currentLanguage="en",this._searchQuery="",this._showFavoritesOnly=!1,this._sortOption="name",this._viewMode="grid",this._showSortMenu=!1,this._globalSearchQuery="",this._searchResults=[],this._searchLoading=!1,this._searchMediaType="track",this._libraryItems=[],this._libraryLoading=!1,this._libraryOffset=0,this._libraryHasMore=!0,this._libraryLimit=25,this._selectedPlaylist=null,this._playlistTracks=[],this._loadingTracks=!1,this._queueItems=[],this._queueLoading=!1,this._queueError=null,this._massQueueAvailable=null,this._currentQueueItemId=null,this._resolvedEntryId=""}setConfig(e){this._config={limit:50,columns:"auto",...e},!this._selectedSpeaker&&this._config.speakers&&this._config.speakers.length>0&&(this._selectedSpeaker=this._config.speakers[0])}getCardConfig(){return this._config}getCardSize(){return 8}getLayoutOptions(){return{grid_rows:8,grid_min_rows:3,grid_columns:4,grid_min_columns:2}}static getConfigElement(){return document.createElement("music-assistant-playlist-card-editor")}static getStubConfig(){return{config_entry_id:"",speakers:[],limit:50}}updated(e){if(super.updated(e),e.has("hass")&&this.hass){const e=this._config?.language;Et(e&&"auto"!==e?e:this.hass.language);const t=Pt;this._currentLanguage!==t&&(this._currentLanguage=t),this._updateDirection()}const t=e.has("hass")&&void 0===e.get("hass")&&this.hass,i=e.get("_config"),a=e.has("_config")&&this.hass&&this._config;(t||a&&(!i||i.config_entry_id!==this._config.config_entry_id||JSON.stringify(i.speakers)!==JSON.stringify(this._config.speakers)))&&this._loadPlaylists()}_updateDirection(){jt()?this.setAttribute("dir","rtl"):this.setAttribute("dir","ltr")}get _massEntryId(){return this._config?.config_entry_id||this._resolvedEntryId||""}async _ensureConfigEntryId(){if(this._config?.config_entry_id)return this._resolvedEntryId=this._config.config_entry_id,this._config.config_entry_id;if(this._resolvedEntryId)return this._resolvedEntryId;if(this.hass)try{const e=await Lt(this.hass.callWS.bind(this.hass),[this._selectedSpeaker,...this._config?.speakers||[]].filter(Boolean));return e&&(this._resolvedEntryId=e),e}catch(e){return void console.warn("[music-assistant-playlist-card] Failed to resolve MA config entry:",e)}}async _callMassService(e,t){return function(e){if(!e||"object"!=typeof e)return;const t=e;return t.response&&"object"==typeof t.response?t.response:t}(await this.hass.callWS({type:"call_service",domain:"music_assistant",service:e,service_data:t,return_response:!0}))}async _fetchPlaylists(e){return Nt(await this._callMassService("get_library",{config_entry_id:e,media_type:"playlist",limit:1e3,offset:0,order_by:"name"}))}async _loadPlaylists(){if(!this.hass||!this._config)return;const e=await this._ensureConfigEntryId();if(e){this._loading=!0,this._error=null;try{this._playlists=await this._fetchPlaylists(e),console.info("[music-assistant-playlist-card] Loaded playlists:",this._playlists.length)}catch(t){console.error("[music-assistant-playlist-card] Failed to load playlists:",t);try{const t=await Lt(this.hass.callWS.bind(this.hass),[this._selectedSpeaker,...this._config?.speakers||[]].filter(Boolean));if(t&&t!==e)return this._resolvedEntryId=t,this._playlists=await this._fetchPlaylists(t),void(this._error=null)}catch(e){console.error("[music-assistant-playlist-card] Playlist retry failed:",e)}this._error=Ct("error.load_failed")}finally{this._loading=!1}}}async _playPlaylist(e){if(this.hass&&this._selectedSpeaker)try{const t=e.uri||e.item_id;await this.hass.callService("music_assistant","play_media",{media_id:t,media_type:"playlist",enqueue:"replace"},{entity_id:this._selectedSpeaker}),console.info("[music-assistant-playlist-card] Playing playlist:",e.name)}catch(e){console.error("[music-assistant-playlist-card] Failed to play playlist:",e)}else console.warn("[music-assistant-playlist-card] No speaker selected")}async _openPlaylist(e){console.info("[music-assistant-playlist-card] Opening playlist:",e.name),this._selectedPlaylist=e,this._loadingTracks=!0,this._playlistTracks=[],console.info("[music-assistant-playlist-card] Selected playlist set, loading tracks..."),await this._loadPlaylistTracks(e)}_closePlaylistDetail(){this._selectedPlaylist=null,this._playlistTracks=[],this._loadingTracks=!1}async _loadPlaylistTracks(e){if(this.hass&&this._massEntryId){console.info("[music-assistant-playlist-card] Loading tracks for playlist:",e.name,"item_id:",e.item_id,"uri:",e.uri);try{let t=[];try{console.info("[music-assistant-playlist-card] Trying browse_media with playlist URI...");const i=e.uri||`library://playlist/${e.item_id}`,a=this._selectedSpeaker||this._config.speakers?.[0];console.info("[music-assistant-playlist-card] browse_media params - entity:",a,"uri:",i);const s=await this.hass.callWS({type:"media_player/browse_media",entity_id:a,media_content_type:"playlist",media_content_id:i});console.info("[music-assistant-playlist-card] browse_media response:",JSON.stringify(s,null,2)),s?.children&&Array.isArray(s.children)&&(t=s.children.map(e=>({item_id:e.media_content_id||e.item_id||"",uri:e.media_content_id||e.uri||"",name:e.title||e.name||"",artist:e.media_artist||e.artist||"",image:e.thumbnail||e.image,duration:e.duration,album:e.media_album_name?{name:e.media_album_name}:void 0})),console.info("[music-assistant-playlist-card] browse_media found tracks:",t.length))}catch(e){console.info("[music-assistant-playlist-card] browse_media failed:",e)}if(0===t.length)try{console.info("[music-assistant-playlist-card] Trying get_item...");const i=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"get_item",service_data:{config_entry_id:this._massEntryId,media_type:"playlist",item_id:e.item_id},return_response:!0});if(console.info("[music-assistant-playlist-card] get_item full response:",JSON.stringify(i,null,2)),i?.response)for(const[e,a]of Object.entries(i.response))if(Array.isArray(a)&&a.length>0){const i=a[0];if(i&&(i.name||i.uri||i.item_id)){t=a,console.info("[music-assistant-playlist-card] Found tracks in key:",e,"count:",t.length);break}}}catch(e){console.info("[music-assistant-playlist-card] get_item failed:",e)}if(0===t.length)try{console.info("[music-assistant-playlist-card] Trying playlist_tracks service...");const i=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:this._massEntryId,media_type:"playlist_tracks",item_id:e.item_id,limit:500},return_response:!0});console.info("[music-assistant-playlist-card] playlist_tracks response:",i),i?.response&&(Array.isArray(i.response)?t=i.response:i.response.items?t=i.response.items:i.response.tracks&&(t=i.response.tracks))}catch(e){console.info("[music-assistant-playlist-card] playlist_tracks failed:",e)}this._playlistTracks=t,console.info("[music-assistant-playlist-card] Final loaded tracks:",this._playlistTracks.length)}catch(e){console.error("[music-assistant-playlist-card] Failed to load playlist tracks:",e),this._playlistTracks=[]}finally{this._loadingTracks=!1}}}async _playTrack(e){if(this.hass&&this._selectedSpeaker)try{const t=e.uri||e.item_id;await this.hass.callService("music_assistant","play_media",{media_id:t,media_type:"track",enqueue:"replace"},{entity_id:this._selectedSpeaker}),console.info("[music-assistant-playlist-card] Playing track:",e.name)}catch(e){console.error("[music-assistant-playlist-card] Failed to play track:",e)}else console.warn("[music-assistant-playlist-card] No speaker selected")}_getTrackArtist(e){return e.artist?e.artist:e.artists&&e.artists.length>0?e.artists.map(e=>e.name).join(", "):""}_getTrackImage(e){return e.image?"string"==typeof e.image?e.image:"object"==typeof e.image&&e.image.path?e.image.path:null:null}_formatDuration(e){if(!e)return"";return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}_checkMassQueueAvailable(){if(!0===this._massQueueAvailable)return!0;const e=!!this.hass?.services?.mass_queue?.get_queue_items;return e&&(this._massQueueAvailable=!0,console.info("[music-assistant-playlist-card] mass_queue integration detected")),e}async _loadQueue(){if(this.hass&&this._selectedSpeaker&&this._checkMassQueueAvailable()){this._queueLoading=!0,this._queueError=null;try{const e=await this.hass.callWS({type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:{entity:this._selectedSpeaker,limit:100,limit_before:5,limit_after:100},return_response:!0});if(console.info("[music-assistant-playlist-card] Queue response:",e),e?.response){const t=e.response[this._selectedSpeaker];if(Array.isArray(t)){this._queueItems=t;const e=this._getMediaPlayerState();if(e?.media_title){const i=t.find(t=>t.media_title===e.media_title);this._currentQueueItemId=i?.queue_item_id||null}console.info("[music-assistant-playlist-card] Loaded queue items:",this._queueItems.length)}else this._queueItems=[]}else this._queueItems=[]}catch(e){console.error("[music-assistant-playlist-card] Failed to load queue:",e),this._queueError=Ct("common.queue_error"),this._queueItems=[]}finally{this._queueLoading=!1}}}async _playQueueItem(e){if(this.hass&&this._selectedSpeaker)try{await this.hass.callService("mass_queue","play_queue_item",{entity:this._selectedSpeaker,queue_item_id:e.queue_item_id}),console.info("[music-assistant-playlist-card] Playing queue item:",e.media_title)}catch(e){console.error("[music-assistant-playlist-card] Failed to play queue item:",e)}}async _removeQueueItem(e,t){if(t.stopPropagation(),this.hass&&this._selectedSpeaker)try{await this.hass.callService("mass_queue","remove_queue_item",{entity:this._selectedSpeaker,queue_item_id:e.queue_item_id}),console.info("[music-assistant-playlist-card] Removed queue item:",e.media_title),await this._loadQueue()}catch(e){console.error("[music-assistant-playlist-card] Failed to remove queue item:",e)}}async _moveQueueItemUp(e,t){if(t.stopPropagation(),this.hass&&this._selectedSpeaker)try{await this.hass.callService("mass_queue","move_queue_item_up",{entity:this._selectedSpeaker,queue_item_id:e.queue_item_id}),await this._loadQueue()}catch(e){console.error("[music-assistant-playlist-card] Failed to move queue item up:",e)}}async _moveQueueItemDown(e,t){if(t.stopPropagation(),this.hass&&this._selectedSpeaker)try{await this.hass.callService("mass_queue","move_queue_item_down",{entity:this._selectedSpeaker,queue_item_id:e.queue_item_id}),await this._loadQueue()}catch(e){console.error("[music-assistant-playlist-card] Failed to move queue item down:",e)}}async _moveQueueItemNext(e,t){if(t.stopPropagation(),this.hass&&this._selectedSpeaker)try{await this.hass.callService("mass_queue","move_queue_item_next",{entity:this._selectedSpeaker,queue_item_id:e.queue_item_id}),await this._loadQueue()}catch(e){console.error("[music-assistant-playlist-card] Failed to move queue item to next:",e)}}_handleTabChange(e){this._activeTab=e,"search"!==e||this._globalSearchQuery.trim()||0!==this._libraryItems.length||this._loadLibrary(!0),"queue"===e&&this._checkMassQueueAvailable()&&this._loadQueue()}_handleSpeakerSelect(e){this._selectedSpeaker=e}_getMediaPlayerState(){if(!this.hass||!this._selectedSpeaker)return null;const e=this.hass.states[this._selectedSpeaker];return e?{state:e.state,media_title:e.attributes.media_title,media_artist:e.attributes.media_artist,media_album_name:e.attributes.media_album_name,entity_picture:e.attributes.entity_picture,media_duration:e.attributes.media_duration,media_position:e.attributes.media_position,media_position_updated_at:e.attributes.media_position_updated_at,volume_level:e.attributes.volume_level,is_volume_muted:e.attributes.is_volume_muted,shuffle:e.attributes.shuffle,repeat:e.attributes.repeat}:null}async _mediaPlayPause(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_play_pause",{},{entity_id:this._selectedSpeaker})}async _mediaNext(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_next_track",{},{entity_id:this._selectedSpeaker})}async _mediaPrevious(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_previous_track",{},{entity_id:this._selectedSpeaker})}async _toggleShuffle(){if(!this.hass||!this._selectedSpeaker)return;const e=this._getMediaPlayerState();await this.hass.callService("media_player","shuffle_set",{shuffle:!e?.shuffle},{entity_id:this._selectedSpeaker})}async _toggleRepeat(){if(!this.hass||!this._selectedSpeaker)return;const e=this._getMediaPlayerState(),t=["off","all","one"],i=t.indexOf(e?.repeat??"off"),a=t[(i+1)%t.length];await this.hass.callService("media_player","repeat_set",{repeat:a},{entity_id:this._selectedSpeaker})}async _setVolume(e){if(!this.hass||!this._selectedSpeaker)return;const t=e.target,i=parseFloat(t.value);await this.hass.callService("media_player","volume_set",{volume_level:i},{entity_id:this._selectedSpeaker})}_updateVolumeSliderFill(e){const t=e.target,i=100*parseFloat(t.value);t.style.background=`linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${i}%, var(--divider-color, rgba(0,0,0,0.1)) ${i}%, var(--divider-color, rgba(0,0,0,0.1)) 100%)`}_handleSearchInput(e){const t=e.target;this._searchQuery=t.value}_toggleFavorites(){this._showFavoritesOnly=!this._showFavoritesOnly}_setSortOption(e){this._sortOption=e,this._showSortMenu=!1}_toggleSortMenu(){this._showSortMenu=!this._showSortMenu}_closeSortMenu(){this._showSortMenu=!1}_setViewMode(e){this._viewMode=e}_getFilteredPlaylists(){let e=[...this._playlists];if(this._showFavoritesOnly&&(e=e.filter(e=>!0===e.favorite)),this._searchQuery.trim()){const t=this._searchQuery.toLowerCase().trim();e=e.filter(e=>e.name.toLowerCase().includes(t))}switch(this._sortOption){case"name":e.sort((e,t)=>e.name.localeCompare(t.name));break;case"name_desc":e.sort((e,t)=>t.name.localeCompare(e.name));break;case"tracks":e.sort((e,t)=>(t.track_count||0)-(e.track_count||0))}return e}_getPlaylistImage(e){return e.image?"string"==typeof e.image?e.image:"object"==typeof e.image&&e.image.path?e.image.path:null:null}_renderLoading(){return U`
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <span class="loading-text">${Ct("common.loading")}</span>
      </div>
    `}_renderError(){return U`
      <div class="error-container">
        <ha-icon icon="mdi:alert-circle"></ha-icon>
        <span class="error-message">${this._error}</span>
      </div>
    `}_renderEmpty(){return U`
      <div class="empty-container">
        <ha-icon icon="mdi:playlist-music"></ha-icon>
        <span class="empty-message">${Ct("common.no_playlists")}</span>
      </div>
    `}_renderNoResults(){return U`
      <div class="empty-container">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <span class="empty-message">${Ct("common.no_results")}</span>
      </div>
    `}_renderPlaylistToolbar(){return U`
      <div class="playlist-toolbar">
        <div class="search-container">
          <ha-icon class="search-icon" icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            class="search-input"
            placeholder="${Ct("common.search_playlists")}"
            .value=${this._searchQuery}
            @input=${this._handleSearchInput}
          />
        </div>
        <div class="toolbar-actions">
          <button
            class="filter-button ${this._showFavoritesOnly?"active":""}"
            @click=${this._toggleFavorites}
            title="${Ct("common.favorites")}"
          >
            <ha-icon icon="${this._showFavoritesOnly?"mdi:star":"mdi:star-outline"}"></ha-icon>
            <span>${this._showFavoritesOnly?Ct("common.favorites"):Ct("common.all")}</span>
          </button>
          
          <div class="sort-dropdown">
            <button
              class="filter-button"
              @click=${this._toggleSortMenu}
              title="${Ct("common.sort")}"
            >
              <ha-icon icon="mdi:sort"></ha-icon>
              <span>${Ct("common.sort")}</span>
            </button>
            ${this._showSortMenu?U`
                  <div class="sort-menu" @mouseleave=${this._closeSortMenu}>
                    <button
                      class="sort-option ${"name"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("name")}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
                      ${Ct("common.sort_name")}
                    </button>
                    <button
                      class="sort-option ${"name_desc"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("name_desc")}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-descending"></ha-icon>
                      ${Ct("common.sort_name_desc")}
                    </button>
                    <button
                      class="sort-option ${"tracks"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("tracks")}
                    >
                      <ha-icon icon="mdi:music-note-outline"></ha-icon>
                      ${Ct("common.sort_tracks")}
                    </button>
                    <button
                      class="sort-option ${"recent"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("recent")}
                    >
                      <ha-icon icon="mdi:clock-outline"></ha-icon>
                      ${Ct("common.sort_recent")}
                    </button>
                  </div>
                `:W}
          </div>

          <div class="toolbar-spacer"></div>

          <div class="view-toggle">
            <button
              class="view-button ${"grid"===this._viewMode?"active":""}"
              @click=${()=>this._setViewMode("grid")}
              title="${Ct("common.view_grid")}"
            >
              <ha-icon icon="mdi:view-grid"></ha-icon>
            </button>
            <button
              class="view-button ${"list"===this._viewMode?"active":""}"
              @click=${()=>this._setViewMode("list")}
              title="${Ct("common.view_list")}"
            >
              <ha-icon icon="mdi:view-list"></ha-icon>
            </button>
          </div>
        </div>
      </div>
    `}_renderTabBar(){const e=It.filter(e=>!e.requiresMassQueue||this._checkMassQueueAvailable());return U`
      <div class="tab-bar">
        ${e.map(e=>U`
            <button
              class="tab-button ${this._activeTab===e.id?"active":""}"
              @click=${()=>this._handleTabChange(e.id)}
              title="${Ct(e.labelKey)}"
            >
              <ha-icon icon="${e.icon}"></ha-icon>
              <span class="tab-label">${Ct(e.labelKey)}</span>
            </button>
          `)}
      </div>
    `}_formatTime(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}_renderNowPlaying(){const e=this._getMediaPlayerState();if(!this._selectedSpeaker)return U`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="now-playing-idle-text">${Ct("common.no_speaker_selected")}</span>
          </div>
        </div>
      `;const t="playing"===e?.state,i=e?.media_title,a=e?.media_duration&&e?.media_position?e.media_position/e.media_duration*100:0;return U`
      <div class="now-playing">
        <div class="now-playing-artwork">
          ${i&&e?.entity_picture?U`<img src="${e.entity_picture}" alt="Album art" />`:U`
                <div class="now-playing-artwork-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        </div>

        <div class="now-playing-info">
          <h3 class="now-playing-title">${i?e?.media_title:Ct("common.nothing_playing")}</h3>
          <p class="now-playing-artist">${i&&e?.media_artist||""}</p>
        </div>

        ${e?.media_duration?U`
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${a}%"></div>
                </div>
                <div class="progress-time">
                  <span>${this._formatTime(e?.media_position||0)}</span>
                  <span>${this._formatTime(e.media_duration)}</span>
                </div>
              </div>
            `:W}

        <div class="player-controls">
          <button class="control-button" @click=${this._mediaPrevious} title="Previous">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="control-button play-pause" @click=${this._mediaPlayPause} title="${t?"Pause":"Play"}">
            <ha-icon icon="${t?"mdi:pause":"mdi:play"}"></ha-icon>
          </button>
          <button class="control-button" @click=${this._mediaNext} title="Next">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>

        <div class="secondary-controls">
          <div class="secondary-controls-left">
            <button 
              class="control-button small ${e?.shuffle?"active":""}" 
              @click=${this._toggleShuffle}
              title="Shuffle"
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>
          </div>
          <div class="secondary-controls-right">
            <button 
              class="control-button small ${"off"!==e?.repeat?"active":""}" 
              @click=${this._toggleRepeat}
              title="Repeat: ${e?.repeat||"off"}"
            >
              <ha-icon icon="${"one"===e?.repeat?"mdi:repeat-once":"mdi:repeat"}"></ha-icon>
            </button>
          </div>
        </div>

        <div class="volume-full-width">
          <ha-icon icon="mdi:volume-low"></ha-icon>
          <input
            type="range"
            class="volume-slider-full"
            min="0"
            max="1"
            step="0.01"
            .value=${String(e?.volume_level||0)}
            @input=${this._updateVolumeSliderFill}
            @change=${this._setVolume}
            style="--volume-percent: ${100*(e?.volume_level||0)}%"
          />
          <ha-icon icon="mdi:volume-high"></ha-icon>
        </div>
      </div>
    `}_renderSpeakers(){return U`
      <div class="speakers-grid">
        ${this._config.speakers.map(e=>{const t=this.hass?.states[e],i=e===this._selectedSpeaker,a=t?.state||"unavailable";return U`
            <button
              class="speaker-button ${i?"active":""}"
              @click=${()=>this._handleSpeakerSelect(e)}
            >
              <ha-icon icon="mdi:speaker"></ha-icon>
              <div class="speaker-button-info">
                <div class="speaker-button-name">${t?.attributes?.friendly_name||e}</div>
                <div class="speaker-button-state">${a}</div>
              </div>
              <ha-icon class="speaker-button-check" icon="mdi:check-circle"></ha-icon>
            </button>
          `})}
      </div>
    `}_handleGlobalSearchInput(e){const t=e.target;this._globalSearchQuery=t.value,this._debouncedSearch()}_handleSearchSubmit(e){e.preventDefault(),this._searchDebounceTimer&&clearTimeout(this._searchDebounceTimer),this._globalSearchQuery.trim()&&this._performSearch()}_setSearchMediaType(e){const t=this._searchMediaType!==e;this._searchMediaType=e,t&&(this._globalSearchQuery.trim()?this._performSearch():this._loadLibrary(!0))}_clearSearch(){this._globalSearchQuery="",this._searchResults=[],this._loadLibrary(!0)}async _performSearch(){if(this.hass&&this._massEntryId&&this._globalSearchQuery.trim()){this._searchLoading=!0,this._searchResults=[];try{const e=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"search",service_data:{config_entry_id:this._massEntryId,name:this._globalSearchQuery,media_type:[this._searchMediaType],library_only:!1,limit:25},return_response:!0});console.info("[music-assistant-playlist-card] Search response:",e);const t=e?.response;t&&("track"===this._searchMediaType&&t.tracks?this._searchResults=t.tracks:"album"===this._searchMediaType&&t.albums?this._searchResults=t.albums:"artist"===this._searchMediaType&&t.artists&&(this._searchResults=t.artists)),console.info("[music-assistant-playlist-card] Search results:",this._searchResults.length)}catch(e){console.error("[music-assistant-playlist-card] Search failed:",e),this._searchResults=[]}finally{this._searchLoading=!1}}}async _loadLibrary(e=!0){if(this.hass&&this._massEntryId&&(e&&(this._libraryItems=[],this._libraryOffset=0,this._libraryHasMore=!0),this._libraryHasMore&&!this._libraryLoading)){this._libraryLoading=!0;try{const t=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:this._massEntryId,media_type:this._searchMediaType,limit:this._libraryLimit,offset:this._libraryOffset,order_by:"name"},return_response:!0});console.info("[music-assistant-playlist-card] Library response:",t);let i=[];const a=t?.response;if(a){const e=this._searchMediaType+"s";if(a[e])i=a[e];else if(a.items)i=a.items;else for(const e of Object.values(a))if(Array.isArray(e)&&e.length>0){i=e;break}}i=i.map(e=>({...e,media_type:e.media_type||this._searchMediaType})),this._libraryItems=e?i:[...this._libraryItems,...i],this._libraryHasMore=i.length>=this._libraryLimit,this._libraryOffset+=i.length,console.info("[music-assistant-playlist-card] Library items loaded:",this._libraryItems.length,"hasMore:",this._libraryHasMore)}catch(e){console.error("[music-assistant-playlist-card] Failed to load library:",e),this._libraryHasMore=!1}finally{this._libraryLoading=!1}}}async _loadMoreLibrary(){!this._libraryLoading&&this._libraryHasMore&&await this._loadLibrary(!1)}_handleSearchScroll(e){const t=e.target;if(!t)return;const i=t.scrollTop;t.scrollHeight-i-t.clientHeight<100&&(this._globalSearchQuery.trim()||this._loadMoreLibrary())}_debouncedSearch(){this._searchDebounceTimer&&clearTimeout(this._searchDebounceTimer),this._searchDebounceTimer=setTimeout(()=>{this._globalSearchQuery.trim()?this._performSearch():(this._searchResults=[],this._loadLibrary(!0))},300)}async _playSearchResult(e){if(this.hass&&this._selectedSpeaker)try{const t=e.uri||e.item_id;await this.hass.callService("music_assistant","play_media",{media_id:t,media_type:e.media_type,enqueue:"replace"},{entity_id:this._selectedSpeaker}),console.info("[music-assistant-playlist-card] Playing:",e.name)}catch(e){console.error("[music-assistant-playlist-card] Failed to play:",e)}else console.warn("[music-assistant-playlist-card] No speaker selected")}async _toggleFavorite(e,t){if(!this.hass||!this._massEntryId)return void console.warn("[music-assistant-playlist-card] Cannot toggle favorite: missing hass or config");const i=!0===e.favorite,a=!i,s=e.media_type||this._searchMediaType,r=e.uri||`library://${s}/${e.item_id}`;let o=e.item_id;if(!o&&e.uri){const t=e.uri.match(/\/([^/]+)$/);t&&(o=t[1])}console.info("[music-assistant-playlist-card] Toggling favorite:",{name:e.name,item_id:o,uri:r,media_type:s,current:i,new:a}),e.favorite=a,this._searchResults=[...this._searchResults],this._libraryItems=[...this._libraryItems];const n=[async()=>{if(!a)throw new Error("Cannot remove favorite with play_media");await this.hass.callService("music_assistant","play_media",{media_id:r,media_type:s,enqueue:"add"},{entity_id:this._selectedSpeaker||this._config.speakers?.[0]})},async()=>{await this.hass.callService("music_assistant",a?"add_to_library":"remove_from_library",{config_entry_id:this._massEntryId,uri:r})},async()=>{await this.hass.callService("music_assistant",a?"add_item_to_library":"remove_item_from_library",{config_entry_id:this._massEntryId,uri:r})},async()=>{await this.hass.callService("music_assistant",a?"favorite":"unfavorite",{config_entry_id:this._massEntryId,uri:r})},async()=>{await this.hass.callService("music_assistant","set_favorite",{config_entry_id:this._massEntryId,uri:r,favorite:a})},async()=>{await this.hass.callWS({type:"mass/favorites/"+(a?"add":"remove"),uri:r})}];for(let t=0;t<n.length;t++)try{return await n[t](),void console.info(`[music-assistant-playlist-card] Favorite toggled successfully (approach ${t+1}):`,e.name,"->",a)}catch(e){console.warn(`[music-assistant-playlist-card] Approach ${t+1} failed:`,e)}console.error("[music-assistant-playlist-card] All favorite toggle approaches failed. Please check Music Assistant services in Developer Tools."),e.favorite=i,this._searchResults=[...this._searchResults],this._libraryItems=[...this._libraryItems]}_getSearchResultImage(e){return e.image?"string"==typeof e.image?e.image:"object"==typeof e.image&&e.image.path?e.image.path:null:null}_getSearchResultArtist(e){return e.artist?e.artist:e.artists&&e.artists.length>0?e.artists.map(e=>e.name).join(", "):null}_renderSearch(){const e=this._globalSearchQuery.trim().length>0,t=!e,i=e?this._searchResults:this._libraryItems,a=e?this._searchLoading:this._libraryLoading;return U`
      <div class="search-view">
        <form class="global-search-form" @submit=${this._handleSearchSubmit}>
          <div class="global-search-container">
            <ha-icon class="search-icon" icon="mdi:magnify"></ha-icon>
            <input
              type="text"
              class="global-search-input"
              placeholder="${Ct("common.search_placeholder")}"
              .value=${this._globalSearchQuery}
              @input=${this._handleGlobalSearchInput}
            />
            ${this._globalSearchQuery?U`
              <button 
                type="button" 
                class="search-clear-button"
                @click=${this._clearSearch}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            `:W}
          </div>
        </form>

        <div class="search-type-filters">
          <button
            class="search-type-button ${"track"===this._searchMediaType?"active":""}"
            @click=${()=>this._setSearchMediaType("track")}
          >
            <ha-icon icon="mdi:music-note"></ha-icon>
            <span>${Ct("common.tracks")}</span>
          </button>
          <button
            class="search-type-button ${"album"===this._searchMediaType?"active":""}"
            @click=${()=>this._setSearchMediaType("album")}
          >
            <ha-icon icon="mdi:album"></ha-icon>
            <span>${Ct("common.albums")}</span>
          </button>
          <button
            class="search-type-button ${"artist"===this._searchMediaType?"active":""}"
            @click=${()=>this._setSearchMediaType("artist")}
          >
            <ha-icon icon="mdi:account-music"></ha-icon>
            <span>${Ct("common.artists")}</span>
          </button>
        </div>

        ${t&&!a&&0===i.length&&this._libraryHasMore?U`
          <!-- Initial library load -->
          ${this._loadLibrary(!0),W}
        `:W}

        ${a&&0===i.length?U`
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <span class="loading-text">${Ct("common.loading")}</span>
          </div>
        `:i.length>0?U`
          <div class="search-results" @scroll=${this._handleSearchScroll}>
            ${i.map(e=>{const t=this._getSearchResultImage(e),i=this._getSearchResultArtist(e),a=e.media_type||this._searchMediaType;return e.favorite,U`
                <div 
                  class="search-result-item"
                  @click=${()=>this._playSearchResult(e)}
                >
                  <div class="search-result-image ${"artist"===a?"artist-image":""}">
                    ${t?U`<img src="${t}" alt="${e.name}" />`:U`<ha-icon icon="${"artist"===a?"mdi:account-music":"album"===a?"mdi:album":"mdi:music-note"}"></ha-icon>`}
                  </div>
                  <div class="search-result-info">
                    <div class="search-result-title">${e.name}</div>
                    ${i?U`<div class="search-result-artist">${i}</div>`:W}
                    ${e.album?.name?U`<div class="search-result-album">${e.album.name}</div>`:W}
                  </div>
                  ${""}
                  <button 
                    class="search-result-play" 
                    title="${Ct("common.play")}"
                    @click=${t=>{t.stopPropagation(),this._playSearchResult(e)}}
                  >
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>
                </div>
              `})}
            ${t&&this._libraryLoading?U`
              <div class="load-more-indicator">
                <div class="loading-spinner small"></div>
              </div>
            `:W}
            ${t&&!this._libraryHasMore&&i.length>0?U`
              <div class="end-of-list">
                <span>${Ct("common.end_of_list")}</span>
              </div>
            `:W}
          </div>
        `:e&&!a?U`
          <div class="search-empty">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <span>${Ct("common.no_results")}</span>
          </div>
        `:a?W:U`
          <div class="search-empty">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            <span>${Ct("common.browse_library")}</span>
          </div>
        `}
      </div>
    `}_renderQueue(){return this._selectedSpeaker?this._queueLoading?U`
        <div class="queue-view">
          ${this._renderLoading()}
        </div>
      `:this._queueError?U`
        <div class="queue-view">
          <div class="error-container">
            <ha-icon icon="mdi:alert-circle"></ha-icon>
            <span class="error-message">${this._queueError}</span>
          </div>
        </div>
      `:0===this._queueItems.length?U`
        <div class="queue-view">
          <div class="empty-container">
            <ha-icon icon="mdi:playlist-play"></ha-icon>
            <span class="empty-message">${Ct("common.queue_empty")}</span>
          </div>
        </div>
      `:U`
      <div class="queue-view">
        <div class="queue-header">
          <span class="queue-count">${this._queueItems.length} ${Ct("common.tracks")}</span>
          <button class="refresh-button" @click=${()=>this._loadQueue()} title="Refresh">
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
        <div class="queue-list">
          ${this._queueItems.map((e,t)=>this._renderQueueItem(e,t))}
        </div>
      </div>
    `:U`
        <div class="queue-view">
          <div class="empty-container">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="empty-message">${Ct("common.no_speaker_selected")}</span>
          </div>
        </div>
      `}_renderQueueItem(e,t){const i=e.queue_item_id===this._currentQueueItemId,a=e.media_image;return U`
      <div 
        class="queue-item ${i?"now-playing":""}"
        @click=${()=>this._playQueueItem(e)}
      >
        <span class="queue-item-number">${t+1}</span>
        <div class="queue-item-image">
          ${a?U`<img src="${a}" alt="${e.media_title}" />`:U`<ha-icon icon="mdi:music-note"></ha-icon>`}
          ${i?U`<div class="now-playing-indicator"><ha-icon icon="mdi:volume-high"></ha-icon></div>`:W}
        </div>
        <div class="queue-item-info">
          <span class="queue-item-title">${e.media_title}</span>
          ${e.media_artist?U`<span class="queue-item-artist">${e.media_artist}</span>`:W}
          ${e.media_album_name?U`<span class="queue-item-album">${e.media_album_name}</span>`:W}
        </div>
        <div class="queue-item-actions">
          <button 
            class="queue-action-btn"
            @click=${t=>this._moveQueueItemUp(e,t)}
            title="${Ct("common.move_up")}"
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button 
            class="queue-action-btn"
            @click=${t=>this._moveQueueItemDown(e,t)}
            title="${Ct("common.move_down")}"
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button 
            class="queue-action-btn"
            @click=${t=>this._moveQueueItemNext(e,t)}
            title="${Ct("common.play_next")}"
          >
            <ha-icon icon="mdi:page-next"></ha-icon>
          </button>
          <button 
            class="queue-action-btn remove"
            @click=${t=>this._removeQueueItem(e,t)}
            title="${Ct("common.remove_from_queue")}"
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `}_renderTabContent(){switch(this._activeTab){case"now-playing":return this._renderNowPlaying();case"playlists":return this._loading?this._renderLoading():this._error?this._renderError():this._renderPlaylistsView();case"queue":return this._renderQueue();case"search":return this._renderSearch();case"speakers":return this._renderSpeakers();default:return U``}}_renderPlaylistsView(){if(this._selectedPlaylist)return this._renderPlaylistDetail();const e=this._getFilteredPlaylists();return U`
      ${this._renderPlaylistToolbar()}
      ${0===e.length&&(this._searchQuery||this._showFavoritesOnly)?this._renderNoResults():0===e.length?this._renderEmpty():"grid"===this._viewMode?this._renderPlaylistGrid(e):this._renderPlaylistList(e)}
    `}_renderPlaylistDetail(){if(!this._selectedPlaylist)return U``;const e=this._selectedPlaylist,t=this._getPlaylistImage(e);return U`
      <div class="playlist-detail">
        <div class="playlist-detail-header">
          <button class="back-button" @click=${this._closePlaylistDetail} title="${Ct("common.back")}">
            <ha-icon icon="${jt()?"mdi:arrow-left":"mdi:arrow-right"}"></ha-icon>
          </button>
          <div class="playlist-detail-image">
            ${t?U`<img src="${t}" alt="${e.name}" />`:U`<ha-icon icon="mdi:playlist-music"></ha-icon>`}
          </div>
          <div class="playlist-detail-info">
            <h3 class="playlist-detail-title">${e.name}</h3>
            <span class="playlist-detail-meta">
              ${this._loadingTracks?Ct("common.loading"):`${this._playlistTracks.length} ${Ct("common.tracks")}`}
            </span>
          </div>
        </div>

        <div class="playlist-detail-actions">
          <button 
            class="play-all-button"
            @click=${()=>this._playPlaylist(e)}
            ?disabled=${!this._selectedSpeaker}
          >
            <ha-icon icon="mdi:play"></ha-icon>
            <span>${Ct("common.play_all")}</span>
          </button>
        </div>

        ${this._loadingTracks?this._renderLoading():0===this._playlistTracks.length?U`
                <div class="empty-container">
                  <ha-icon icon="mdi:music-note-off"></ha-icon>
                  <span class="empty-message">${Ct("common.no_tracks")}</span>
                </div>
              `:U`
                <div class="tracks-list">
                  ${this._playlistTracks.map((e,t)=>this._renderTrackItem(e,t))}
                </div>
              `}
      </div>
    `}_renderTrackItem(e,t){const i=this._getTrackImage(e),a=this._getTrackArtist(e),s=this._formatDuration(e.duration);return U`
      <div 
        class="track-item"
        @click=${()=>this._playTrack(e)}
      >
        <span class="track-number">${t+1}</span>
        <div class="track-image">
          ${i?U`<img src="${i}" alt="${e.name}" />`:U`<ha-icon icon="mdi:music-note"></ha-icon>`}
        </div>
        <div class="track-info">
          <span class="track-name">${e.name}</span>
          ${a?U`<span class="track-artist">${a}</span>`:W}
        </div>
        ${s?U`<span class="track-duration">${s}</span>`:W}
        <button 
          class="track-play-btn"
          @click=${t=>{t.stopPropagation(),this._playTrack(e)}}
          title="${Ct("common.play")}"
        >
          <ha-icon icon="mdi:play"></ha-icon>
        </button>
      </div>
    `}_renderPlaylistGrid(e){const t=this._config.columns&&"auto"!==this._config.columns?`columns-${this._config.columns}`:"";return U`
      <div class="playlists-scroll-container">
        <div class="playlist-grid ${t}">
          ${e.map(e=>this._renderPlaylistItem(e))}
        </div>
      </div>
    `}_renderPlaylistList(e){return U`
      <div class="playlists-scroll-container">
        <div class="playlist-list">
          ${e.map(e=>this._renderPlaylistItem(e))}
        </div>
      </div>
    `}_renderPlaylistItem(e){const t=this._getPlaylistImage(e);return U`
      <div 
        class="playlist-item ripple" 
        title="${e.name}"
        @click=${()=>this._openPlaylist(e)}
      >
        <div class="playlist-image-container">
          ${t?U`<img
                class="playlist-image"
                src=${t}
                alt=${e.name}
                loading="lazy"
              />`:U`
                <div class="playlist-placeholder">
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </div>
              `}
        </div>
        <div class="playlist-info">
          <p class="playlist-name">${e.name}</p>
          ${e.track_count?U`<p class="playlist-meta">${e.track_count} ${Ct("common.tracks")}</p>`:W}
        </div>
        <button 
          class="play-button-corner" 
          aria-label="${Ct("common.play")}"
          @click=${t=>{t.stopPropagation(),this._playPlaylist(e)}}
        >
          <ha-icon icon="mdi:play"></ha-icon>
        </button>
      </div>
    `}_isConfigValid(){return!!((this._config?.config_entry_id||this._resolvedEntryId)&&this._config?.speakers&&this._config.speakers.length>0)}_renderConfigWarning(){const e=!this._massEntryId,t=!this._config?.speakers||0===this._config.speakers.length;let i="";return e&&t?i=Ct("error.missing_config"):t?i=Ct("error.missing_speakers"):e&&(i="Please configure Music Assistant Instance ID"),U`
      <div class="config-warning">
        <ha-icon icon="mdi:alert"></ha-icon>
        <span class="config-warning-message">${i}</span>
      </div>
    `}_isPreviewMode(){const e=!(!this._config?.config_entry_id&&!this._resolvedEntryId);return!this.hass||!e}_renderPreview(){return U`
      <div class="now-playing">
        <div class="now-playing-artwork preview-artwork">
          <div class="preview-gradient">
            <ha-icon icon="mdi:music"></ha-icon>
          </div>
        </div>
        <div class="now-playing-info">
          <h3 class="now-playing-title">Music Assistant</h3>
          <p class="now-playing-artist">Player Card</p>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: 35%"></div>
          </div>
          <div class="progress-time">
            <span>1:24</span>
            <span>4:02</span>
          </div>
        </div>
        <div class="player-controls">
          <button class="control-button">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="control-button play-pause">
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
          <button class="control-button">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `}render(){if(!this._config)return U`
        <ha-card>
          <div class="config-warning">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span class="config-warning-message">${Ct("error.missing_config")}</span>
          </div>
        </ha-card>
      `;const e=this._isConfigValid(),t=this._isPreviewMode()&&!e,i=this._config.card_height||680,a=Math.min(280,Math.max(120,.4*i));return U`
      <ha-card style="--card-height: ${i}px; --artwork-size: ${a}px;">
        ${this._config.title?U`
              <div class="card-header">
                <h2 class="card-title">${this._config.title}</h2>
              </div>
            `:W}
        <div class="tab-content">
          ${t?U`<div class="tab-view">${this._renderPreview()}</div>`:e?U`<div class="tab-view">${this._renderTabContent()}</div>`:U`<div class="tab-view">${this._renderConfigWarning()}</div>`}
        </div>
        ${this._renderTabBar()}
      </ha-card>
    `}};Rt.styles=me,e([ue({attribute:!1})],Rt.prototype,"hass",void 0),e([he()],Rt.prototype,"_config",void 0),e([he()],Rt.prototype,"_playlists",void 0),e([he()],Rt.prototype,"_loading",void 0),e([he()],Rt.prototype,"_error",void 0),e([he()],Rt.prototype,"_selectedSpeaker",void 0),e([he()],Rt.prototype,"_activeTab",void 0),e([he()],Rt.prototype,"_currentLanguage",void 0),e([he()],Rt.prototype,"_searchQuery",void 0),e([he()],Rt.prototype,"_showFavoritesOnly",void 0),e([he()],Rt.prototype,"_sortOption",void 0),e([he()],Rt.prototype,"_viewMode",void 0),e([he()],Rt.prototype,"_showSortMenu",void 0),e([he()],Rt.prototype,"_globalSearchQuery",void 0),e([he()],Rt.prototype,"_searchResults",void 0),e([he()],Rt.prototype,"_searchLoading",void 0),e([he()],Rt.prototype,"_searchMediaType",void 0),e([he()],Rt.prototype,"_libraryItems",void 0),e([he()],Rt.prototype,"_libraryLoading",void 0),e([he()],Rt.prototype,"_libraryOffset",void 0),e([he()],Rt.prototype,"_libraryHasMore",void 0),e([he()],Rt.prototype,"_selectedPlaylist",void 0),e([he()],Rt.prototype,"_playlistTracks",void 0),e([he()],Rt.prototype,"_loadingTracks",void 0),e([he()],Rt.prototype,"_queueItems",void 0),e([he()],Rt.prototype,"_queueLoading",void 0),e([he()],Rt.prototype,"_queueError",void 0),e([he()],Rt.prototype,"_massQueueAvailable",void 0),e([he()],Rt.prototype,"_currentQueueItemId",void 0),e([he()],Rt.prototype,"_resolvedEntryId",void 0),Rt=e([ce("music-assistant-playlist-card")],Rt),window.customCards=window.customCards||[],window.customCards.push({type:"music-assistant-playlist-card",name:"Music Assistant Playlist Card",description:"Display Music Assistant playlists with speaker selection",preview:!0,documentationURL:"https://github.com/davidss20/music-assistant-playlist-card"});export{Rt as MusicAssistantPlaylistCard};
