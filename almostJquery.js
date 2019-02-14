class almostJquery {

    constructor(selector){
        if(selector instanceof HTMLElement || selector instanceof Node ){ 
             this.currentElement =  selector  
        }
        else{
            this.currentElement = this.get(selector);
        }
    }

    get  ( selector )  { 

        if( ! ( typeof selector === 'string' || selector instanceof String ) ){
            return;
        }

        if( selector[0] === '#' ){
            this.currentElement = document.querySelector( selector );
            return this.currentElement;    
        }
        this.currentElement = Array.from( document.querySelectorAll( selector ) );
        return this.currentElement
    }

    delete  (  ) {
        var el = this.currentElement;
        Array.isArray( el ) ? el.map( i => i.remove() ) : el.remove();
        this.currentElement= null;
    }

    createElement  ( tagName, props )  
    {
        return this.setAttrsToElement( document.createElement( tagName ), props);
    }

    appendToElement ( tagName, props )  {
        if( tagName == undefined || tagName == null ){
            return;
        }
          Array.isArray( this.currentElement ) ? this.currentElement.map( i =>  i.appendChild(  this.createElement( tagName, props ) ) )
                            : this.currentElement.appendChild( this.createElement( tagName, props ) );
        return this;
    }

    modify  ( props )  {
        Array.isArray( this.currentElement ) ? this.currentElement.map( i =>  this.setAttrsToElement( i, props ) ) 
                                     : this.setAttrsToElement( this.currentElement, props);  
        return this;
    }

    addClassToElementClassList(classes){
        if(classes == undefined || classes == null){
            return;
        }
        Array.isArray(classes) ? classes.map(i=>this.currentElement.classList.add( i )) :  this.currentElement.classList.add( classes )
    }
    elementsClassListHasClass(eclass){
        if(eclass == undefined || eclass == null){
            return;
        }
        return this.currentElement.classList.contains(eclass);
    }

    modifyStyles (  props )  {
        var   setStylesToElement =( target, props )=>{
            for( var key in props ){
                target.style[ key ] = props[ key ];
            }            
            return target;
        }
        Array.isArray( this.currentElement ) ? this.currentElement.map( i =>  setStylesToElement( i, props ) ) 
                            : setStylesToElement( this.currentElement, props);  
    }

    setAttrsToElement ( target, props ){
        for( var key in props ){
            if (key =='innerText'){
                target.innerText = props[key]; 

                continue;
            }
            else if (key =='innerHTML'){
                target.innerHTML = props[key]; 
                continue;
            }
            target.setAttribute( key, props[key] )
        }
        
        return target;
    }

    getElementsParent  ()  {
        this.currentElement =  Array.isArray( this.currentElement )  ? this.currentElement.map( i => i.parentElement ) 
                                                     : this.currentElement.parentElement;  
        return this;
    }
    getElementsNextSibling  ()  {
        this.currentElement =  Array.isArray( this.currentElement )  ? this.currentElement.map( i => i.nextSibling ) 
                                                     : this.currentElement.nextSibling;  
        return this;
    }
    getElementsPreviousSibling  ()  {
        this.currentElement =  Array.isArray( this.currentElement )  ? this.currentElement.map( i => i.previousSibling ) 
                                                     : this.currentElement.previousSibling;  
        return this;
    }
    getElementsChildren  ()  {
        this.currentElement =  Array.isArray( this.currentElement )  ? this.currentElement.map( i => i.children ) 
                                                     : this.currentElement.children;  
        return this;
    }

    setElementsEventHandler  (props)  {
        var setEventToEventHandler = ( target ,props ) => {
            for( var key in props ){
                target[key] = props[key] ;
            }
        }
        Array.isArray( this.currentElement )  ? this.currentElement.map( i => setEventToEventHandler( i, props ) ) 
                                                     : setEventToEventHandler(this.currentElement , props);  

        return this;
    }
}
const $ = (selector) => { return new almostJquery(selector) }

