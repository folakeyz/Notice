import * as React from 'react';
import styles from './Notices.module.scss';
import { INoticesProps } from './INoticesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassNotice } from './ClassNotice';
import { INotice } from './INotice';
import { Web } from "sp-pnp-js";

export default class Notices extends React.Component<INoticesProps, any> {
  public constructor(props:INoticesProps,any)
  {
      
      super(props);
      this.state={
          items:[]
      }
      }
  public render(): React.ReactElement<INoticesProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <div className={ styles.notice }>
         <div className={ styles.headline }>
                <div className={ styles.grid }>
                    <div className={ styles.hcard }>
                       <h1>IMPORTANT NOTICE</h1>
                    </div> 
                    <div className={ styles.hcard }>
                      <a href="https://axamansard.sharepoint.com/SitePages/Notice.aspx">View All</a>
                    </div> 
                </div> 
            </div>

        <div className={ styles.grid }>
                 {
        this.state.items.map(function(item:INotice){
    return(
      <div className={ styles.card }>
       <h4>{item.Title}</h4>
       <h4>{item.Notice}</h4>
      <small>{item.Date}</small>
      </div>
         
 )

    
})

} 
      
      </div>
      </div>
    );
  }

  public componentDidMount()
  {
      
      // debugger;
      this._NewsList();
  }
  private _NewsList():void
  {
  
   
  let web = new Web(this.props.context.pageContext.web.absoluteUrl);  
  web.lists.getByTitle(`Notice`).items.get().then
  
      ((response)=>{
        console.log(response)

          let NewsCollection=response.map(item=> new ClassNotice(item)).reverse();
          let NewsCard = NewsCollection.slice(0, 6)
          this.setState({items:NewsCard});
      }
  
      )
  }

}
