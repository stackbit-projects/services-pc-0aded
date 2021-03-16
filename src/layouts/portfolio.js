import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {classNames, getPages, Link, withPrefix} from '../utils';

export default class Portfolio extends React.Component {
    render() {
        let layout_style = _.get(this.props, 'page.frontmatter.layout_style', null) || 'mosaic';
        let projects_sorted = _.orderBy(getPages(this.props.pages, '/portfolio'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <header className={classNames('section', 'section--header', {'screen-reader-text': _.get(this.props, 'page.frontmatter.hide_title', null)})}>
              <div className="container container--lg">
                <h1 className="section__title line-top">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                <p className="section__subtitle">{_.get(this.props, 'page.frontmatter.subtitle', null)}</p>
                )}
              </div>
            </header>
            <div className="section section--portfolio">
              <div className="container container--lg">
                <div className={'grid portfolio-feed portfolio-feed--' + layout_style}>
                  {_.map(projects_sorted, (project, project_idx) => (
                  <article key={project_idx} className="cell project-card">
                    <Link href={withPrefix(_.get(project, '__metadata.urlPath', null))} className="project-card__link">
                      {_.get(project, 'frontmatter.thumb_image', null) && (
                      <div className="project-card__image">
                        <img src={withPrefix(_.get(project, 'frontmatter.thumb_image', null))} alt={_.get(project, 'frontmatter.thumb_image_alt', null)} />
                      </div>
                      )}
                      <header className="project-card__header">
                        <h2 className="project-card__title">{_.get(project, 'frontmatter.title', null)}</h2>
                        {_.get(project, 'frontmatter.subtitle', null) && (
                        <div className="project-card__subtitle">
                          {_.get(project, 'frontmatter.subtitle', null)}
                        </div>
                        )}
                      </header>
                    </Link>
                  </article>
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}
