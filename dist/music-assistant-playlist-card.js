function e(e,t,i,s){var a,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:h}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,y=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const o=a.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const o=this.constructor;if(!1===s&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,f?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,$=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+z,E=`<${P}>`,N=document,q=()=>N.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,j="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,L=/>/g,R=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),Q=new WeakMap,B=N.createTreeWalker(N,129);function Z(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,s=[];let a,o=2===t?"<svg>":3===t?"<math>":"",r=T;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=I:void 0!==l[1]?r=L:void 0!==l[2]?(F.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=a??T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?R:'"'===l[3]?H:U):r===H||r===U?r=R:r===I||r===L?r=T:(r=R,a=void 0);const p=r===R&&e[t+1].startsWith("/>")?" ":"";o+=r===T?i+E:c>=0?(s.push(n),i.slice(0,c)+C+i.slice(c)+z+p):i+z+(-2===c?t:p)}return[Z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class G{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,o=0;const r=e.length-1,n=this.parts,[l,c]=K(e,t);if(this.el=G.createElement(l,i),B.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=B.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[o++],i=s.getAttribute(e).split(z),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(z)&&(n.push({type:6,index:a}),s.removeAttribute(e));if(F.test(s.tagName)){const e=s.textContent.split(z),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],q()),B.nextNode(),n.push({type:2,index:++a});s.append(e[t],q())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(z,e+1));)n.push({type:7,index:a}),e+=z.length-1}a++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===W)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=J(e,a._$AS(e,t.values),a,s)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??N).importNode(t,!0);B.currentNode=s;let a=B.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new X(a,a.nextSibling,this,e):1===n.type?t=new n.ctor(a,n.name,n.strings,this,e):6===n.type&&(t=new ae(a,this,e)),this._$AV.push(t),n=i[++r]}o!==n?.index&&(a=B.nextNode(),o++)}return B.currentNode=N,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),M(e)?e===D||null==e||""===e?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Y(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Q.get(e.strings);return void 0===t&&Q.set(e.strings,t=new G(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new X(this.O(q()),this.O(q()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}_$AI(e,t=this,i,s){const a=this.strings;let o=!1;if(void 0===a)e=J(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const s=e;let r,n;for(e=a[0],r=0;r<a.length-1;r++)n=J(this,s[i+r],t,r),n===W&&(n=this._$AH[r]),o||=!M(n)||n!==this._$AH[r],n===D?e=D:e!==D&&(e+=(n??"")+a[r+1]),this._$AH[r]=n}o&&!s&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}}class se extends ee{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??D)===W)return;const i=this._$AH,s=e===D&&i!==D||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==D&&(i===D||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=w.litHtmlPolyfillSupport;oe?.(G,X),(w.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;class ne extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new X(t.insertBefore(q(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const le=re.litElementPolyfillSupport;le?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},pe=(e=de,t,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ue(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return ue({...e,state:!0,attribute:!1})}const ge=r`
  :host {
    --mdc-icon-size: 20px;
    --playlist-card-spacing: 12px;
    --playlist-card-border-radius: 12px;
    --playlist-image-size: 100%;
    --playlist-item-gap: 12px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: inherit;
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

  :host([dir="rtl"]) .queue-item {
    flex-direction: row-reverse;
    text-align: right;
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
    overflow: hidden;
    height: 100%;
    min-height: inherit;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
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

  .playlist-list .play-overlay {
    position: relative;
    width: 40px;
    height: 40px;
    background: transparent;
    opacity: 1;
    flex-shrink: 0;
  }

  .playlist-list .play-button {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .playlist-list .playlist-item:hover .play-button {
    opacity: 1;
  }

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

  /* Play Overlay */
  .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .playlist-item:hover .play-overlay {
    opacity: 1;
  }

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
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .tab-view {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--playlist-card-spacing);
  }

  .tab-view::-webkit-scrollbar {
    width: 6px;
  }

  .tab-view::-webkit-scrollbar-track {
    background: transparent;
  }

  .tab-view::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .tab-view::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
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
    height: 100%;
  }

  .now-playing-artwork {
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
    max-width: 320px;
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
    max-width: 320px;
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

  /* ==========================================================================
     Speakers View
     ========================================================================== */

  .speakers-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
     Queue View
     ========================================================================== */

  .queue-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .queue-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: transparent;
    border-radius: 8px;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  .queue-item:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .queue-item.playing {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }

  .queue-item-image {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
  }

  .queue-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .queue-item-info {
    flex: 1;
    min-width: 0;
  }

  .queue-item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-playing-icon {
    --mdc-icon-size: 20px;
    color: var(--primary-color);
  }

  .queue-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 24px;
    color: var(--secondary-text-color);
  }

  .queue-empty ha-icon {
    --mdc-icon-size: 48px;
    opacity: 0.3;
  }
`,me=r`
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
  ha-select {
    width: 100%;
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

  .add-speaker {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .add-speaker ha-entity-picker {
    flex: 1;
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
`;var _e={loading:"Loading playlists...",error:"An error occurred",no_playlists:"No playlists found",play:"Play",select_speaker:"Select Speaker",no_speaker_selected:"No speaker selected",nothing_playing:"Nothing is currently playing",queue_empty:"Queue is empty",search:"Search",search_playlists:"Search playlists...",favorites:"Favorites",all:"All",sort:"Sort",sort_name:"Name (A-Z)",sort_name_desc:"Name (Z-A)",sort_tracks:"Track count",sort_recent:"Recently added",view_grid:"Grid view",view_list:"List view",no_results:"No playlists match your search",tracks:"tracks"},fe={title:"Card Title",config_entry_id:"Music Assistant Instance",speakers:"Speakers",limit:"Number of Playlists",columns:"Columns",columns_auto:"Auto",favorites_only:"Favorites Only",language:"Language",language_auto:"Auto (from Home Assistant)"},ye={missing_config:"Missing configuration. Please configure the card.",missing_speakers:"No speakers configured. Please add speakers in card settings.",load_failed:"Failed to load playlists. Please check your Music Assistant configuration.",play_failed:"Failed to play playlist"},ve={common:_e,config:fe,error:ye},be={loading:"טוען פלייליסטים...",error:"אירעה שגיאה",no_playlists:"לא נמצאו פלייליסטים",play:"הפעל",select_speaker:"בחר רמקול",no_speaker_selected:"לא נבחר רמקול",nothing_playing:"אין כרגע מוזיקה מתנגנת",queue_empty:"התור ריק",search:"חיפוש",search_playlists:"חפש פלייליסטים...",favorites:"מועדפים",all:"הכל",sort:"מיון",sort_name:"שם (א-ת)",sort_name_desc:"שם (ת-א)",sort_tracks:"מספר שירים",sort_recent:"נוספו לאחרונה",view_grid:"תצוגת רשת",view_list:"תצוגת רשימה",no_results:"לא נמצאו פלייליסטים תואמים",tracks:"שירים"},xe={title:"כותרת הכרטיס",config_entry_id:"מופע Music Assistant",speakers:"רמקולים",limit:"מספר פלייליסטים",columns:"עמודות",columns_auto:"אוטומטי",favorites_only:"מועדפים בלבד",language:"שפה",language_auto:"אוטומטי (מ-Home Assistant)"},ke={missing_config:"חסרה הגדרה. אנא הגדר את הכרטיס.",missing_speakers:"לא הוגדרו רמקולים. אנא הוסף רמקולים בהגדרות הכרטיס.",load_failed:"נכשל בטעינת פלייליסטים. אנא בדוק את הגדרות Music Assistant.",play_failed:"נכשל בהפעלת הפלייליסט"},we={common:be,config:xe,error:ke},$e={loading:"جاري تحميل قوائم التشغيل...",error:"حدث خطأ",no_playlists:"لم يتم العثور على قوائم تشغيل",play:"تشغيل",select_speaker:"اختر مكبر الصوت",no_speaker_selected:"لم يتم اختيار مكبر صوت",nothing_playing:"لا يوجد شيء قيد التشغيل حالياً",queue_empty:"قائمة الانتظار فارغة",search:"بحث",search_playlists:"البحث في قوائم التشغيل...",favorites:"المفضلة",all:"الكل",sort:"ترتيب",sort_name:"الاسم (أ-ي)",sort_name_desc:"الاسم (ي-أ)",sort_tracks:"عدد المقاطع",sort_recent:"المضافة حديثاً",view_grid:"عرض شبكي",view_list:"عرض قائمة",no_results:"لا توجد قوائم تشغيل مطابقة",tracks:"مقاطع"},Ae={title:"عنوان البطاقة",config_entry_id:"مثيل Music Assistant",speakers:"مكبرات الصوت",limit:"عدد قوائم التشغيل",columns:"الأعمدة",columns_auto:"تلقائي",favorites_only:"المفضلة فقط",language:"اللغة",language_auto:"تلقائي (من Home Assistant)"},Se={missing_config:"الإعدادات مفقودة. يرجى تهيئة البطاقة.",missing_speakers:"لم يتم تهيئة مكبرات الصوت. يرجى إضافة مكبرات صوت.",load_failed:"فشل تحميل قوائم التشغيل. يرجى التحقق من إعدادات Music Assistant.",play_failed:"فشل تشغيل قائمة التشغيل"},Ce={common:$e,config:Ae,error:Se},ze={loading:"Wiedergabelisten werden geladen...",error:"Ein Fehler ist aufgetreten",no_playlists:"Keine Wiedergabelisten gefunden",play:"Abspielen",select_speaker:"Lautsprecher auswählen",no_speaker_selected:"Kein Lautsprecher ausgewählt",nothing_playing:"Es wird derzeit nichts abgespielt",queue_empty:"Warteschlange ist leer",search:"Suchen",search_playlists:"Wiedergabelisten suchen...",favorites:"Favoriten",all:"Alle",sort:"Sortieren",sort_name:"Name (A-Z)",sort_name_desc:"Name (Z-A)",sort_tracks:"Anzahl Titel",sort_recent:"Kürzlich hinzugefügt",view_grid:"Rasteransicht",view_list:"Listenansicht",no_results:"Keine passenden Wiedergabelisten",tracks:"Titel"},Pe={title:"Kartentitel",config_entry_id:"Music Assistant Instanz",speakers:"Lautsprecher",limit:"Anzahl der Wiedergabelisten",columns:"Spalten",columns_auto:"Automatisch",favorites_only:"Nur Favoriten",language:"Sprache",language_auto:"Automatisch (von Home Assistant)"},Ee={missing_config:"Konfiguration fehlt. Bitte konfigurieren Sie die Karte.",missing_speakers:"Keine Lautsprecher konfiguriert. Bitte fügen Sie Lautsprecher hinzu.",load_failed:"Wiedergabelisten konnten nicht geladen werden. Überprüfen Sie die Music Assistant Konfiguration.",play_failed:"Wiedergabeliste konnte nicht abgespielt werden"},Ne={common:ze,config:Pe,error:Ee},qe={loading:"Chargement des playlists...",error:"Une erreur s'est produite",no_playlists:"Aucune playlist trouvée",play:"Lecture",select_speaker:"Sélectionner un haut-parleur",no_speaker_selected:"Aucun haut-parleur sélectionné",nothing_playing:"Rien n'est en cours de lecture",queue_empty:"La file d'attente est vide",search:"Rechercher",search_playlists:"Rechercher des playlists...",favorites:"Favoris",all:"Tout",sort:"Trier",sort_name:"Nom (A-Z)",sort_name_desc:"Nom (Z-A)",sort_tracks:"Nombre de pistes",sort_recent:"Ajoutés récemment",view_grid:"Vue grille",view_list:"Vue liste",no_results:"Aucune playlist correspondante",tracks:"pistes"},Me={title:"Titre de la carte",config_entry_id:"Instance Music Assistant",speakers:"Haut-parleurs",limit:"Nombre de playlists",columns:"Colonnes",columns_auto:"Automatique",favorites_only:"Favoris uniquement",language:"Langue",language_auto:"Automatique (depuis Home Assistant)"},Oe={missing_config:"Configuration manquante. Veuillez configurer la carte.",missing_speakers:"Aucun haut-parleur configuré. Veuillez ajouter des haut-parleurs.",load_failed:"Échec du chargement des playlists. Vérifiez la configuration de Music Assistant.",play_failed:"Échec de la lecture de la playlist"},je={common:qe,config:Me,error:Oe},Te={loading:"Cargando listas de reproducción...",error:"Se produjo un error",no_playlists:"No se encontraron listas de reproducción",play:"Reproducir",select_speaker:"Seleccionar altavoz",no_speaker_selected:"Ningún altavoz seleccionado",nothing_playing:"No se está reproduciendo nada",queue_empty:"La cola está vacía",search:"Buscar",search_playlists:"Buscar listas...",favorites:"Favoritos",all:"Todo",sort:"Ordenar",sort_name:"Nombre (A-Z)",sort_name_desc:"Nombre (Z-A)",sort_tracks:"Número de pistas",sort_recent:"Añadidos recientemente",view_grid:"Vista cuadrícula",view_list:"Vista lista",no_results:"No hay listas coincidentes",tracks:"pistas"},Ie={title:"Título de la tarjeta",config_entry_id:"Instancia de Music Assistant",speakers:"Altavoces",limit:"Número de listas de reproducción",columns:"Columnas",columns_auto:"Automático",favorites_only:"Solo favoritos",language:"Idioma",language_auto:"Automático (desde Home Assistant)"},Le={missing_config:"Falta la configuración. Por favor, configure la tarjeta.",missing_speakers:"No hay altavoces configurados. Por favor, agregue altavoces.",load_failed:"Error al cargar las listas de reproducción. Verifique la configuración de Music Assistant.",play_failed:"Error al reproducir la lista de reproducción"},Re={common:Te,config:Ie,error:Le},Ue={loading:"Caricamento playlist...",error:"Si è verificato un errore",no_playlists:"Nessuna playlist trovata",play:"Riproduci",select_speaker:"Seleziona altoparlante",no_speaker_selected:"Nessun altoparlante selezionato",nothing_playing:"Nessuna riproduzione in corso",queue_empty:"La coda è vuota",search:"Cerca",search_playlists:"Cerca playlist...",favorites:"Preferiti",all:"Tutti",sort:"Ordina",sort_name:"Nome (A-Z)",sort_name_desc:"Nome (Z-A)",sort_tracks:"Numero di tracce",sort_recent:"Aggiunti di recente",view_grid:"Vista griglia",view_list:"Vista elenco",no_results:"Nessuna playlist corrispondente",tracks:"tracce"},He={title:"Titolo scheda",config_entry_id:"Istanza Music Assistant",speakers:"Altoparlanti",limit:"Numero di playlist",columns:"Colonne",columns_auto:"Auto",favorites_only:"Solo preferiti",language:"Lingua",language_auto:"Auto (da Home Assistant)"},Fe={missing_config:"Configurazione mancante. Configura la scheda.",missing_speakers:"Nessun altoparlante configurato. Aggiungi altoparlanti.",load_failed:"Impossibile caricare le playlist. Controlla la configurazione di Music Assistant.",play_failed:"Impossibile riprodurre la playlist"},Ve={common:Ue,config:He,error:Fe},We={loading:"Carregando playlists...",error:"Ocorreu um erro",no_playlists:"Nenhuma playlist encontrada",play:"Reproduzir",select_speaker:"Selecionar alto-falante",no_speaker_selected:"Nenhum alto-falante selecionado",nothing_playing:"Nada está tocando no momento",queue_empty:"A fila está vazia",search:"Pesquisar",search_playlists:"Pesquisar playlists...",favorites:"Favoritos",all:"Todos",sort:"Ordenar",sort_name:"Nome (A-Z)",sort_name_desc:"Nome (Z-A)",sort_tracks:"Número de faixas",sort_recent:"Adicionados recentemente",view_grid:"Visualização em grade",view_list:"Visualização em lista",no_results:"Nenhuma playlist correspondente",tracks:"faixas"},De={title:"Título do cartão",config_entry_id:"Instância do Music Assistant",speakers:"Alto-falantes",limit:"Número de playlists",columns:"Colunas",columns_auto:"Auto",favorites_only:"Apenas favoritos",language:"Idioma",language_auto:"Auto (do Home Assistant)"},Qe={missing_config:"Configuração ausente. Configure o cartão.",missing_speakers:"Nenhum alto-falante configurado. Adicione alto-falantes.",load_failed:"Falha ao carregar playlists. Verifique a configuração do Music Assistant.",play_failed:"Falha ao reproduzir a playlist"},Be={common:We,config:De,error:Qe},Ze={loading:"Afspeellijsten laden...",error:"Er is een fout opgetreden",no_playlists:"Geen afspeellijsten gevonden",play:"Afspelen",select_speaker:"Speaker selecteren",no_speaker_selected:"Geen speaker geselecteerd",nothing_playing:"Er wordt momenteel niets afgespeeld",queue_empty:"Wachtrij is leeg",search:"Zoeken",search_playlists:"Afspeellijsten zoeken...",favorites:"Favorieten",all:"Alles",sort:"Sorteren",sort_name:"Naam (A-Z)",sort_name_desc:"Naam (Z-A)",sort_tracks:"Aantal nummers",sort_recent:"Recent toegevoegd",view_grid:"Rasterweergave",view_list:"Lijstweergave",no_results:"Geen overeenkomende afspeellijsten",tracks:"nummers"},Ke={title:"Kaarttitel",config_entry_id:"Music Assistant instantie",speakers:"Speakers",limit:"Aantal afspeellijsten",columns:"Kolommen",columns_auto:"Automatisch",favorites_only:"Alleen favorieten",language:"Taal",language_auto:"Automatisch (van Home Assistant)"},Ge={missing_config:"Configuratie ontbreekt. Configureer de kaart.",missing_speakers:"Geen speakers geconfigureerd. Voeg speakers toe.",load_failed:"Kan afspeellijsten niet laden. Controleer de Music Assistant configuratie.",play_failed:"Kan afspeellijst niet afspelen"},Je={common:Ze,config:Ke,error:Ge},Ye={loading:"Загрузка плейлистов...",error:"Произошла ошибка",no_playlists:"Плейлисты не найдены",play:"Воспроизвести",select_speaker:"Выбрать колонку",no_speaker_selected:"Колонка не выбрана",nothing_playing:"Сейчас ничего не воспроизводится",queue_empty:"Очередь пуста",search:"Поиск",search_playlists:"Поиск плейлистов...",favorites:"Избранное",all:"Все",sort:"Сортировка",sort_name:"Имя (А-Я)",sort_name_desc:"Имя (Я-А)",sort_tracks:"Количество треков",sort_recent:"Недавно добавленные",view_grid:"Сетка",view_list:"Список",no_results:"Плейлисты не найдены",tracks:"треков"},Xe={title:"Заголовок карточки",config_entry_id:"Экземпляр Music Assistant",speakers:"Колонки",limit:"Количество плейлистов",columns:"Столбцы",columns_auto:"Авто",favorites_only:"Только избранное",language:"Язык",language_auto:"Авто (из Home Assistant)"},et={missing_config:"Отсутствует конфигурация. Настройте карточку.",missing_speakers:"Колонки не настроены. Добавьте колонки в настройках.",load_failed:"Не удалось загрузить плейлисты. Проверьте настройки Music Assistant.",play_failed:"Не удалось воспроизвести плейлист"},tt={common:Ye,config:Xe,error:et},it={loading:"Ładowanie playlist...",error:"Wystąpił błąd",no_playlists:"Nie znaleziono playlist",play:"Odtwórz",select_speaker:"Wybierz głośnik",no_speaker_selected:"Nie wybrano głośnika",nothing_playing:"Nic nie jest obecnie odtwarzane",queue_empty:"Kolejka jest pusta",search:"Szukaj",search_playlists:"Szukaj playlist...",favorites:"Ulubione",all:"Wszystkie",sort:"Sortuj",sort_name:"Nazwa (A-Z)",sort_name_desc:"Nazwa (Z-A)",sort_tracks:"Liczba utworów",sort_recent:"Ostatnio dodane",view_grid:"Widok siatki",view_list:"Widok listy",no_results:"Brak pasujących playlist",tracks:"utworów"},st={title:"Tytuł karty",config_entry_id:"Instancja Music Assistant",speakers:"Głośniki",limit:"Liczba playlist",columns:"Kolumny",columns_auto:"Auto",favorites_only:"Tylko ulubione",language:"Język",language_auto:"Auto (z Home Assistant)"},at={missing_config:"Brak konfiguracji. Skonfiguruj kartę.",missing_speakers:"Nie skonfigurowano głośników. Dodaj głośniki.",load_failed:"Nie udało się załadować playlist. Sprawdź konfigurację Music Assistant.",play_failed:"Nie udało się odtworzyć playlisty"},ot={common:it,config:st,error:at},rt={loading:"正在加载播放列表...",error:"发生错误",no_playlists:"未找到播放列表",play:"播放",select_speaker:"选择扬声器",no_speaker_selected:"未选择扬声器",nothing_playing:"当前没有播放内容",queue_empty:"队列为空",search:"搜索",search_playlists:"搜索播放列表...",favorites:"收藏",all:"全部",sort:"排序",sort_name:"名称 (A-Z)",sort_name_desc:"名称 (Z-A)",sort_tracks:"曲目数量",sort_recent:"最近添加",view_grid:"网格视图",view_list:"列表视图",no_results:"没有匹配的播放列表",tracks:"首曲目"},nt={title:"卡片标题",config_entry_id:"Music Assistant 实例",speakers:"扬声器",limit:"播放列表数量",columns:"列数",columns_auto:"自动",favorites_only:"仅收藏",language:"语言",language_auto:"自动（从 Home Assistant）"},lt={missing_config:"缺少配置。请配置卡片。",missing_speakers:"未配置扬声器。请添加扬声器。",load_failed:"无法加载播放列表。请检查 Music Assistant 配置。",play_failed:"无法播放播放列表"},ct={common:rt,config:nt,error:lt},dt={loading:"プレイリストを読み込み中...",error:"エラーが発生しました",no_playlists:"プレイリストが見つかりません",play:"再生",select_speaker:"スピーカーを選択",no_speaker_selected:"スピーカーが選択されていません",nothing_playing:"現在再生中のものはありません",queue_empty:"キューは空です",search:"検索",search_playlists:"プレイリストを検索...",favorites:"お気に入り",all:"すべて",sort:"並び替え",sort_name:"名前 (A-Z)",sort_name_desc:"名前 (Z-A)",sort_tracks:"トラック数",sort_recent:"最近追加",view_grid:"グリッド表示",view_list:"リスト表示",no_results:"一致するプレイリストがありません",tracks:"曲"},pt={title:"カードタイトル",config_entry_id:"Music Assistant インスタンス",speakers:"スピーカー",limit:"プレイリスト数",columns:"列数",columns_auto:"自動",favorites_only:"お気に入りのみ",language:"言語",language_auto:"自動（Home Assistantから）"},ut={missing_config:"設定がありません。カードを設定してください。",missing_speakers:"スピーカーが設定されていません。スピーカーを追加してください。",load_failed:"プレイリストの読み込みに失敗しました。Music Assistantの設定を確認してください。",play_failed:"プレイリストの再生に失敗しました"},ht={common:dt,config:pt,error:ut};const gt={en:Object.freeze({__proto__:null,common:_e,config:fe,default:ve,error:ye}),he:Object.freeze({__proto__:null,common:be,config:xe,default:we,error:ke}),ar:Object.freeze({__proto__:null,common:$e,config:Ae,default:Ce,error:Se}),de:Object.freeze({__proto__:null,common:ze,config:Pe,default:Ne,error:Ee}),fr:Object.freeze({__proto__:null,common:qe,config:Me,default:je,error:Oe}),es:Object.freeze({__proto__:null,common:Te,config:Ie,default:Re,error:Le}),it:Object.freeze({__proto__:null,common:Ue,config:He,default:Ve,error:Fe}),pt:Object.freeze({__proto__:null,common:We,config:De,default:Be,error:Qe}),nl:Object.freeze({__proto__:null,common:Ze,config:Ke,default:Je,error:Ge}),ru:Object.freeze({__proto__:null,common:Ye,config:Xe,default:tt,error:et}),pl:Object.freeze({__proto__:null,common:it,config:st,default:ot,error:at}),zh:Object.freeze({__proto__:null,common:rt,config:nt,default:ct,error:lt}),ja:Object.freeze({__proto__:null,common:dt,config:pt,default:ht,error:ut})},mt=["he","ar"],_t="en";let ft=_t;function yt(e){const t=e.split("-")[0].toLowerCase();ft=gt[t]?t:_t}function vt(e,t){const i=t.split(".");let s=e;for(const e of i){if(!s||"object"!=typeof s||!(e in s))return;s=s[e]}return"string"==typeof s?s:void 0}function bt(e,t){let i=vt(gt[ft],e);return i||ft===_t||(i=vt(gt[_t],e)),i||(console.warn(`[music-assistant-playlist-card] Missing translation for key: ${e}`),e)}const xt=[{id:"now-playing",icon:"mdi:music-note",label:"Now Playing"},{id:"playlists",icon:"mdi:playlist-music",label:"Playlists"},{id:"queue",icon:"mdi:playlist-play",label:"Queue"},{id:"speakers",icon:"mdi:speaker",label:"Speakers"}];let kt=class extends ne{constructor(){super(...arguments),this._selectedNewSpeaker=""}setConfig(e){if(this._config=e,this.hass){const t=e.language;yt(t&&"auto"!==t?t:this.hass.language)}}_configChanged(e){((e,t,i)=>{const s=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,detail:i});e.dispatchEvent(s)})(this,"config-changed",{config:e})}_valueChanged(e){const t=e.target,i=t.dataset.configKey;if(!i)return;let s=t.value;"number"===t.type&&(s=parseInt(t.value,10),isNaN(s))||("checkbox"===t.type&&(s=t.checked),this._config={...this._config,[i]:s},this._configChanged(this._config))}_columnsChanged(e){const t=e.target.value;this._config={...this._config,columns:"auto"===t?"auto":parseInt(t,10)},this._configChanged(this._config)}_addSpeaker(){this._selectedNewSpeaker&&(this._config.speakers?.includes(this._selectedNewSpeaker)?this._selectedNewSpeaker="":(this._config={...this._config,speakers:[...this._config.speakers||[],this._selectedNewSpeaker]},this._selectedNewSpeaker="",this._configChanged(this._config)))}_removeSpeaker(e){this._config={...this._config,speakers:(this._config.speakers||[]).filter(t=>t!==e)},this._configChanged(this._config)}_newSpeakerChanged(e){this._selectedNewSpeaker=e.detail.value||""}_getEntityName(e){if(!this.hass)return e;const t=this.hass.states[e];return t?.attributes?.friendly_name||e}render(){if(!this.hass||!this._config)return V``;const e=Object.keys(gt);return V`
      <div class="editor-container">
        <!-- Basic Settings -->
        <div class="section-title">Basic Settings</div>

        <div class="form-row">
          <label class="form-label">${bt("config.title")}</label>
          <ha-textfield
            .value=${this._config.title||""}
            .configKey=${"title"}
            data-config-key="title"
            @input=${this._valueChanged}
            placeholder="My Playlists"
          ></ha-textfield>
        </div>

        <div class="form-row">
          <label class="form-label">${bt("config.config_entry_id")}</label>
          <ha-textfield
            .value=${this._config.config_entry_id||""}
            data-config-key="config_entry_id"
            @input=${this._valueChanged}
            placeholder="01KD2Q1R471MB35ZRQ82C6CN2S"
            required
          ></ha-textfield>
        </div>

        <!-- Speakers -->
        <div class="section-title">${bt("config.speakers")}</div>

        <div class="form-row">
          ${this._config.speakers&&this._config.speakers.length>0?V`
                <div class="speakers-list">
                  ${this._config.speakers.map(e=>V`
                      <div class="speaker-chip">
                        <ha-icon icon="mdi:speaker"></ha-icon>
                        <span>${this._getEntityName(e)}</span>
                        <button
                          class="remove-btn"
                          @click=${()=>this._removeSpeaker(e)}
                          title="Remove"
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    `)}
                </div>
              `:D}

          <div class="add-speaker">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._selectedNewSpeaker}
              .includeDomains=${["media_player"]}
              @value-changed=${this._newSpeakerChanged}
              allow-custom-entity
              label="Add Speaker"
            ></ha-entity-picker>
            <ha-button @click=${this._addSpeaker} ?disabled=${!this._selectedNewSpeaker}>
              Add
            </ha-button>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="section-title">Display Settings</div>

        <div class="form-row">
          <label class="form-label">${bt("config.limit")}</label>
          <ha-textfield
            type="number"
            .value=${String(this._config.limit||25)}
            data-config-key="limit"
            @input=${this._valueChanged}
            min="1"
            max="100"
          ></ha-textfield>
        </div>

        <div class="form-row">
          <label class="form-label">${bt("config.columns")}</label>
          <ha-select
            .value=${String(this._config.columns||"auto")}
            @selected=${this._columnsChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="auto">${bt("config.columns_auto")}</mwc-list-item>
            <mwc-list-item value="2">2</mwc-list-item>
            <mwc-list-item value="3">3</mwc-list-item>
            <mwc-list-item value="4">4</mwc-list-item>
            <mwc-list-item value="5">5</mwc-list-item>
            <mwc-list-item value="6">6</mwc-list-item>
          </ha-select>
        </div>

        <!-- Language Settings -->
        <div class="section-title">${bt("config.language")}</div>

        <div class="form-row">
          <ha-select
            .value=${this._config.language||"auto"}
            data-config-key="language"
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="auto">${bt("config.language_auto")}</mwc-list-item>
            ${e.map(e=>V`
                <mwc-list-item value=${e}>${e.toUpperCase()}</mwc-list-item>
              `)}
          </ha-select>
        </div>
      </div>
    `}};kt.styles=me,e([ue({attribute:!1})],kt.prototype,"hass",void 0),e([he()],kt.prototype,"_config",void 0),e([he()],kt.prototype,"_selectedNewSpeaker",void 0),kt=e([ce("music-assistant-playlist-card-editor")],kt);console.info("%c MUSIC-ASSISTANT-PLAYLIST-CARD %c v1.1.2 ","color: white; background: #7c3aed; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #7c3aed; background: #e9d5ff; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let wt=class extends ne{constructor(){super(...arguments),this._playlists=[],this._loading=!0,this._error=null,this._selectedSpeaker="",this._activeTab="now-playing",this._queueItems=[],this._queueLoading=!1,this._currentQueueIndex=-1,this._currentLanguage="en",this._searchQuery="",this._showFavoritesOnly=!1,this._sortOption="name",this._viewMode="grid",this._showSortMenu=!1}setConfig(e){this._config={limit:50,columns:"auto",...e},!this._selectedSpeaker&&this._config.speakers&&this._config.speakers.length>0&&(this._selectedSpeaker=this._config.speakers[0])}getCardConfig(){return this._config}getCardSize(){return 8}getLayoutOptions(){return{grid_rows:8,grid_min_rows:3,grid_columns:4,grid_min_columns:2}}static getConfigElement(){return document.createElement("music-assistant-playlist-card-editor")}static getStubConfig(){return{config_entry_id:"",speakers:[],limit:50}}updated(e){if(super.updated(e),e.has("hass")&&this.hass){const t=this._config?.language;yt(t&&"auto"!==t?t:this.hass.language);const i=ft;this._currentLanguage!==i&&(this._currentLanguage=i),this._updateDirection(),this._config&&void 0===e.get("hass")&&this._loadPlaylists()}}_updateDirection(){mt.includes(ft)?this.setAttribute("dir","rtl"):this.setAttribute("dir","ltr")}async _loadPlaylists(){if(this.hass&&this._config?.config_entry_id){this._loading=!0,this._error=null;try{const e=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:this._config.config_entry_id,media_type:"playlist",favorite:!1,limit:1e3,offset:0,order_by:"name"},return_response:!0});if(console.info("[music-assistant-playlist-card] Raw response:",e),console.info("[music-assistant-playlist-card] Response keys:",e?.response?Object.keys(e.response):"no response"),e?.response)for(const[t,i]of Object.entries(e.response))Array.isArray(i)?console.info(`[music-assistant-playlist-card] Key "${t}" has ${i.length} items`):console.info(`[music-assistant-playlist-card] Key "${t}":`,i);if(e?.response?.playlists)this._playlists=e.response.playlists,console.info("[music-assistant-playlist-card] Found in playlists key:",this._playlists.length);else if(e?.response?.items)this._playlists=e.response.items,console.info("[music-assistant-playlist-card] Found in items key:",this._playlists.length);else if(e?.response&&"object"==typeof e.response){const t=Object.keys(e.response);for(const i of t){const t=e.response[i];if(Array.isArray(t)&&t.length>0){this._playlists=t,console.info("[music-assistant-playlist-card] Found playlists in key:",i);break}}}else this._playlists=[];console.info("[music-assistant-playlist-card] Loaded playlists:",this._playlists.length)}catch(e){console.error("[music-assistant-playlist-card] Failed to load playlists:",e),this._error=bt("error.load_failed")}finally{this._loading=!1}}}async _playPlaylist(e){if(this.hass&&this._selectedSpeaker)try{const t=e.uri||e.item_id;await this.hass.callService("music_assistant","play_media",{media_id:t,media_type:"playlist",enqueue:"replace"},{entity_id:this._selectedSpeaker}),console.info("[music-assistant-playlist-card] Playing playlist:",e.name)}catch(e){console.error("[music-assistant-playlist-card] Failed to play playlist:",e)}else console.warn("[music-assistant-playlist-card] No speaker selected")}_handleTabChange(e){this._activeTab=e,"queue"===e&&this._loadQueue()}async _loadQueue(){if(this.hass&&this._selectedSpeaker){this._queueLoading=!0;try{const e=this.hass.states[this._selectedSpeaker];if(!e)return console.warn("[music-assistant-playlist-card] Entity not found:",this._selectedSpeaker),void(this._queueItems=[]);console.info("[music-assistant-playlist-card] Entity attributes:",e.attributes);const t=e.attributes.mass_player_id||e.attributes.queue_id||this._selectedSpeaker.replace("media_player.","");console.info("[music-assistant-playlist-card] Trying to get queue for:",t);try{const e=await this.hass.callWS({type:"music_assistant/queue/items",queue_id:t});if(console.info("[music-assistant-playlist-card] Queue response:",e),e?.items?this._queueItems=e.items:e?.queue_items?this._queueItems=e.queue_items:Array.isArray(e)?this._queueItems=e:this._queueItems=[],e?.current_item?.queue_item_id){const t=e.current_item.queue_item_id;this._currentQueueIndex=this._queueItems.findIndex(e=>e.queue_item_id===t||e.item_id===t)}else this._currentQueueIndex=e?.current_index??-1;console.info("[music-assistant-playlist-card] Queue items loaded:",this._queueItems.length)}catch(t){console.warn("[music-assistant-playlist-card] WebSocket queue failed, trying service:",t);try{const e=await this.hass.callWS({type:"call_service",domain:"music_assistant",service:"get_queue",service_data:{entity_id:this._selectedSpeaker},return_response:!0});console.info("[music-assistant-playlist-card] Service queue response:",e),this._queueItems=e?.response?.items?e.response.items:e?.response?.queue_items?e.response.queue_items:[]}catch(t){console.warn("[music-assistant-playlist-card] Service queue also failed:",t);const i=e.attributes.queue_items;i&&Array.isArray(i)?(this._queueItems=i,this._currentQueueIndex=e.attributes.queue_position??-1):this._queueItems=[]}}}catch(e){console.error("[music-assistant-playlist-card] Failed to load queue:",e),this._queueItems=[]}finally{this._queueLoading=!1}}else this._queueItems=[]}_handleSpeakerSelect(e){this._selectedSpeaker=e}_getMediaPlayerState(){if(!this.hass||!this._selectedSpeaker)return null;const e=this.hass.states[this._selectedSpeaker];return e?{state:e.state,media_title:e.attributes.media_title,media_artist:e.attributes.media_artist,media_album_name:e.attributes.media_album_name,entity_picture:e.attributes.entity_picture,media_duration:e.attributes.media_duration,media_position:e.attributes.media_position,media_position_updated_at:e.attributes.media_position_updated_at,volume_level:e.attributes.volume_level,is_volume_muted:e.attributes.is_volume_muted,shuffle:e.attributes.shuffle,repeat:e.attributes.repeat}:null}async _mediaPlayPause(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_play_pause",{},{entity_id:this._selectedSpeaker})}async _mediaNext(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_next_track",{},{entity_id:this._selectedSpeaker})}async _mediaPrevious(){this.hass&&this._selectedSpeaker&&await this.hass.callService("media_player","media_previous_track",{},{entity_id:this._selectedSpeaker})}async _toggleShuffle(){if(!this.hass||!this._selectedSpeaker)return;const e=this._getMediaPlayerState();await this.hass.callService("media_player","shuffle_set",{shuffle:!e?.shuffle},{entity_id:this._selectedSpeaker})}async _toggleRepeat(){if(!this.hass||!this._selectedSpeaker)return;const e=this._getMediaPlayerState(),t=["off","all","one"],i=t.indexOf(e?.repeat??"off"),s=t[(i+1)%t.length];await this.hass.callService("media_player","repeat_set",{repeat:s},{entity_id:this._selectedSpeaker})}async _setVolume(e){if(!this.hass||!this._selectedSpeaker)return;const t=e.target,i=parseFloat(t.value);await this.hass.callService("media_player","volume_set",{volume_level:i},{entity_id:this._selectedSpeaker})}_handleSearchInput(e){const t=e.target;this._searchQuery=t.value}_toggleFavorites(){this._showFavoritesOnly=!this._showFavoritesOnly}_setSortOption(e){this._sortOption=e,this._showSortMenu=!1}_toggleSortMenu(){this._showSortMenu=!this._showSortMenu}_closeSortMenu(){this._showSortMenu=!1}_setViewMode(e){this._viewMode=e}_getFilteredPlaylists(){let e=[...this._playlists];if(this._showFavoritesOnly&&(e=e.filter(e=>!0===e.favorite)),this._searchQuery.trim()){const t=this._searchQuery.toLowerCase().trim();e=e.filter(e=>e.name.toLowerCase().includes(t))}switch(this._sortOption){case"name":e.sort((e,t)=>e.name.localeCompare(t.name));break;case"name_desc":e.sort((e,t)=>t.name.localeCompare(e.name));break;case"tracks":e.sort((e,t)=>(t.track_count||0)-(e.track_count||0))}return e}_getPlaylistImage(e){return e.image?"string"==typeof e.image?e.image:"object"==typeof e.image&&e.image.path?e.image.path:null:null}_renderLoading(){return V`
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <span class="loading-text">${bt("common.loading")}</span>
      </div>
    `}_renderError(){return V`
      <div class="error-container">
        <ha-icon icon="mdi:alert-circle"></ha-icon>
        <span class="error-message">${this._error}</span>
      </div>
    `}_renderEmpty(){return V`
      <div class="empty-container">
        <ha-icon icon="mdi:playlist-music"></ha-icon>
        <span class="empty-message">${bt("common.no_playlists")}</span>
      </div>
    `}_renderNoResults(){return V`
      <div class="empty-container">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <span class="empty-message">${bt("common.no_results")}</span>
      </div>
    `}_renderPlaylistToolbar(){return V`
      <div class="playlist-toolbar">
        <div class="search-container">
          <ha-icon class="search-icon" icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            class="search-input"
            placeholder="${bt("common.search_playlists")}"
            .value=${this._searchQuery}
            @input=${this._handleSearchInput}
          />
        </div>
        <div class="toolbar-actions">
          <button
            class="filter-button ${this._showFavoritesOnly?"active":""}"
            @click=${this._toggleFavorites}
            title="${bt("common.favorites")}"
          >
            <ha-icon icon="${this._showFavoritesOnly?"mdi:star":"mdi:star-outline"}"></ha-icon>
            <span>${this._showFavoritesOnly?bt("common.favorites"):bt("common.all")}</span>
          </button>
          
          <div class="sort-dropdown">
            <button
              class="filter-button"
              @click=${this._toggleSortMenu}
              title="${bt("common.sort")}"
            >
              <ha-icon icon="mdi:sort"></ha-icon>
              <span>${bt("common.sort")}</span>
            </button>
            ${this._showSortMenu?V`
                  <div class="sort-menu" @mouseleave=${this._closeSortMenu}>
                    <button
                      class="sort-option ${"name"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("name")}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
                      ${bt("common.sort_name")}
                    </button>
                    <button
                      class="sort-option ${"name_desc"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("name_desc")}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-descending"></ha-icon>
                      ${bt("common.sort_name_desc")}
                    </button>
                    <button
                      class="sort-option ${"tracks"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("tracks")}
                    >
                      <ha-icon icon="mdi:music-note-outline"></ha-icon>
                      ${bt("common.sort_tracks")}
                    </button>
                    <button
                      class="sort-option ${"recent"===this._sortOption?"active":""}"
                      @click=${()=>this._setSortOption("recent")}
                    >
                      <ha-icon icon="mdi:clock-outline"></ha-icon>
                      ${bt("common.sort_recent")}
                    </button>
                  </div>
                `:D}
          </div>

          <div class="toolbar-spacer"></div>

          <div class="view-toggle">
            <button
              class="view-button ${"grid"===this._viewMode?"active":""}"
              @click=${()=>this._setViewMode("grid")}
              title="${bt("common.view_grid")}"
            >
              <ha-icon icon="mdi:view-grid"></ha-icon>
            </button>
            <button
              class="view-button ${"list"===this._viewMode?"active":""}"
              @click=${()=>this._setViewMode("list")}
              title="${bt("common.view_list")}"
            >
              <ha-icon icon="mdi:view-list"></ha-icon>
            </button>
          </div>
        </div>
      </div>
    `}_renderTabBar(){return V`
      <div class="tab-bar">
        ${xt.map(e=>V`
            <button
              class="tab-button ${this._activeTab===e.id?"active":""}"
              @click=${()=>this._handleTabChange(e.id)}
              title="${e.label}"
            >
              <ha-icon icon="${e.icon}"></ha-icon>
              <span class="tab-label">${e.label}</span>
            </button>
          `)}
      </div>
    `}_formatTime(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,"0")}`}_renderNowPlaying(){const e=this._getMediaPlayerState();if(!e||!this._selectedSpeaker)return V`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="now-playing-idle-text">${bt("common.no_speaker_selected")}</span>
          </div>
        </div>
      `;const t="playing"===e.state;if("idle"===e.state||"off"===e.state||!e.media_title)return V`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:music-note-off"></ha-icon>
            <span class="now-playing-idle-text">${bt("common.nothing_playing")}</span>
          </div>
        </div>
      `;const i=e.media_duration&&e.media_position?e.media_position/e.media_duration*100:0;return V`
      <div class="now-playing">
        <div class="now-playing-artwork">
          ${e.entity_picture?V`<img src="${e.entity_picture}" alt="Album art" />`:V`
                <div class="now-playing-artwork-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        </div>

        <div class="now-playing-info">
          <h3 class="now-playing-title">${e.media_title||"Unknown"}</h3>
          <p class="now-playing-artist">${e.media_artist||"Unknown artist"}</p>
        </div>

        ${e.media_duration?V`
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${i}%"></div>
                </div>
                <div class="progress-time">
                  <span>${this._formatTime(e.media_position||0)}</span>
                  <span>${this._formatTime(e.media_duration)}</span>
                </div>
              </div>
            `:D}

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
              class="control-button small ${e.shuffle?"active":""}" 
              @click=${this._toggleShuffle}
              title="Shuffle"
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>
            <button 
              class="control-button small ${"off"!==e.repeat?"active":""}" 
              @click=${this._toggleRepeat}
              title="Repeat: ${e.repeat||"off"}"
            >
              <ha-icon icon="${"one"===e.repeat?"mdi:repeat-once":"mdi:repeat"}"></ha-icon>
            </button>
          </div>
          <div class="secondary-controls-right">
            <div class="volume-container">
              <ha-icon icon="mdi:volume-high"></ha-icon>
              <input
                type="range"
                class="volume-slider"
                min="0"
                max="1"
                step="0.01"
                .value=${String(e.volume_level||0)}
                @change=${this._setVolume}
              />
            </div>
          </div>
        </div>
      </div>
    `}_renderSpeakers(){return V`
      <div class="speakers-grid">
        ${this._config.speakers.map(e=>{const t=this.hass?.states[e],i=e===this._selectedSpeaker,s=t?.state||"unavailable";return V`
            <button
              class="speaker-button ${i?"active":""}"
              @click=${()=>this._handleSpeakerSelect(e)}
            >
              <ha-icon icon="mdi:speaker"></ha-icon>
              <div class="speaker-button-info">
                <div class="speaker-button-name">${t?.attributes?.friendly_name||e}</div>
                <div class="speaker-button-state">${s}</div>
              </div>
              <ha-icon class="speaker-button-check" icon="mdi:check-circle"></ha-icon>
            </button>
          `})}
      </div>
    `}_getQueueItemImage(e){return e.image?"string"==typeof e.image?e.image:"object"==typeof e.image&&e.image.path?e.image.path:null:null}async _playQueueItem(e){if(this.hass&&this._selectedSpeaker)try{await this.hass.callService("music_assistant","play_index",{index:e},{entity_id:this._selectedSpeaker})}catch(e){console.error("[music-assistant-playlist-card] Failed to play queue item:",e)}}_renderQueue(){return this._selectedSpeaker?this._queueLoading?V`
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <span class="loading-text">${bt("common.loading")}</span>
        </div>
      `:0===this._queueItems.length?V`
        <div class="queue-empty">
          <ha-icon icon="mdi:playlist-play"></ha-icon>
          <span>${bt("common.queue_empty")}</span>
        </div>
      `:V`
      <div class="queue-list">
        ${this._queueItems.map((e,t)=>{const i=this._getQueueItemImage(e),s=t===this._currentQueueIndex;return V`
            <div 
              class="queue-item ${s?"playing":""}"
              @click=${()=>this._playQueueItem(t)}
            >
              <div class="queue-item-image">
                ${i?V`<img src="${i}" alt="${e.name}" />`:V`<ha-icon icon="mdi:music-note"></ha-icon>`}
              </div>
              <div class="queue-item-info">
                <div class="queue-item-title">${e.name}</div>
                ${e.artist?V`<div class="queue-item-artist">${e.artist}</div>`:D}
              </div>
              ${s?V`<ha-icon class="queue-item-playing-icon" icon="mdi:volume-high"></ha-icon>`:D}
            </div>
          `})}
      </div>
    `:V`
        <div class="queue-empty">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <span>${bt("common.no_speaker_selected")}</span>
        </div>
      `}_renderTabContent(){switch(this._activeTab){case"now-playing":return this._renderNowPlaying();case"playlists":return this._loading?this._renderLoading():this._error?this._renderError():this._renderPlaylistsView();case"queue":return this._renderQueue();case"speakers":return this._renderSpeakers();default:return V``}}_renderPlaylistsView(){const e=this._getFilteredPlaylists();return V`
      ${this._renderPlaylistToolbar()}
      ${0===e.length&&(this._searchQuery||this._showFavoritesOnly)?this._renderNoResults():0===e.length?this._renderEmpty():"grid"===this._viewMode?this._renderPlaylistGrid(e):this._renderPlaylistList(e)}
    `}_renderPlaylistGrid(e){const t=this._config.columns&&"auto"!==this._config.columns?`columns-${this._config.columns}`:"";return V`
      <div class="playlist-grid ${t}">
        ${e.map(e=>this._renderPlaylistItem(e))}
      </div>
    `}_renderPlaylistList(e){return V`
      <div class="playlist-list">
        ${e.map(e=>this._renderPlaylistItem(e))}
      </div>
    `}_renderPlaylistItem(e){const t=this._getPlaylistImage(e);return V`
      <div
        class="playlist-item ripple"
        @click=${()=>this._playPlaylist(e)}
        title="${e.name}"
      >
        <div class="playlist-image-container">
          ${t?V`<img
                class="playlist-image"
                src=${t}
                alt=${e.name}
                loading="lazy"
              />`:V`
                <div class="playlist-placeholder">
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </div>
              `}
          <div class="play-overlay">
            <button class="play-button" aria-label="${bt("common.play")}">
              <ha-icon icon="mdi:play"></ha-icon>
            </button>
          </div>
        </div>
        <div class="playlist-info">
          <p class="playlist-name">${e.name}</p>
          ${e.track_count?V`<p class="playlist-meta">${e.track_count} ${bt("common.tracks")}</p>`:D}
        </div>
      </div>
    `}_isConfigValid(){return!!(this._config?.config_entry_id&&this._config?.speakers&&this._config.speakers.length>0)}_renderConfigWarning(){const e=!this._config?.config_entry_id,t=!this._config?.speakers||0===this._config.speakers.length;let i="";return e&&t?i=bt("error.missing_config"):t?i=bt("error.missing_speakers"):e&&(i="Please configure Music Assistant Instance ID"),V`
      <div class="config-warning">
        <ha-icon icon="mdi:alert"></ha-icon>
        <span class="config-warning-message">${i}</span>
      </div>
    `}render(){if(!this._config)return V`
        <ha-card>
          <div class="config-warning">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span class="config-warning-message">${bt("error.missing_config")}</span>
          </div>
        </ha-card>
      `;const e=this._isConfigValid();return V`
      <ha-card>
        ${this._config.title?V`
              <div class="card-header">
                <h2 class="card-title">${this._config.title}</h2>
              </div>
            `:D}
        <div class="tab-content">
          ${e?V`<div class="tab-view">${this._renderTabContent()}</div>`:V`<div class="tab-view">${this._renderConfigWarning()}</div>`}
        </div>
        ${this._renderTabBar()}
      </ha-card>
    `}};wt.styles=ge,e([ue({attribute:!1})],wt.prototype,"hass",void 0),e([he()],wt.prototype,"_config",void 0),e([he()],wt.prototype,"_playlists",void 0),e([he()],wt.prototype,"_loading",void 0),e([he()],wt.prototype,"_error",void 0),e([he()],wt.prototype,"_selectedSpeaker",void 0),e([he()],wt.prototype,"_activeTab",void 0),e([he()],wt.prototype,"_queueItems",void 0),e([he()],wt.prototype,"_queueLoading",void 0),e([he()],wt.prototype,"_currentQueueIndex",void 0),e([he()],wt.prototype,"_currentLanguage",void 0),e([he()],wt.prototype,"_searchQuery",void 0),e([he()],wt.prototype,"_showFavoritesOnly",void 0),e([he()],wt.prototype,"_sortOption",void 0),e([he()],wt.prototype,"_viewMode",void 0),e([he()],wt.prototype,"_showSortMenu",void 0),wt=e([ce("music-assistant-playlist-card")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"music-assistant-playlist-card",name:"Music Assistant Playlist Card",description:"Display Music Assistant playlists with speaker selection",preview:!0,documentationURL:"https://github.com/davidss20/music-assistant-playlist-card"});export{wt as MusicAssistantPlaylistCard};
