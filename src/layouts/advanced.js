import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';

export default class Advanced extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            {(!_.get(this.props, 'page.frontmatter.hide_title', null)) && (
            <header className="section section--header">
              <div className="container container--lg">
                <h1 className="section__title line-top">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                <p className="section__subtitle">{_.get(this.props, 'page.frontmatter.subtitle', null)}</p>
                )}
              </div>
            </header>
            )}
            {_.map(_.get(this.props, 'page.frontmatter.sections', null), (section, section_idx) => {
                let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                let Component = components[component];
                return (
                  <Component key={section_idx} {...this.props} section={section} site={this.props} />
                )
            })}
            </Layout>
        );
    }
}
