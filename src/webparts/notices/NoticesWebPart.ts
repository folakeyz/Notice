import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NoticesWebPartStrings';
import Notices from './components/Notices';
import { INoticesProps } from './components/INoticesProps';

export interface INoticesWebPartProps {
  description: string;
  Name: string;
  Title: string;
  Notice:string;
  url:string;
  Date:string;
}

export default class NoticesWebPart extends BaseClientSideWebPart<INoticesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INoticesProps> = React.createElement(
      Notices,
      {
        description: this.properties.description,
        Name: this.properties.Name,
        Title: this.properties.Title,
        Notice: this.properties.Notice,
        url: this.properties.url,
        Date: this.properties.Date,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
