import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';

// Create a new indiekit instance
const indiekit = new Indiekit();

// Configure Jekyll publication preset
const jekyll = new JekyllPreset();

// Configure GitHub content store
const github = new GithubStore({
  user: 'darylshaw',
  repo: 'darylshaw.co.uk',
  branch: 'master',
  token: process.env.GITHUB_TOKEN
});

// Override preset post type
indiekit.set('publication.postTypes', [{
  type: 'article',
  name: 'Article',
  post: {
    path: '_posts/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'blog/{slug}'
  },
  media: {
    path: 'assets/uploads/{filename}'
  }
}, {
  type: 'note',
  name: 'Note',
  post: {
    path: '_notes/{yyyy}-{MM}-{dd}-slug.md',
    url: 'notes/{slug}'
  }
}]);

// Configure publication
indiekit.set('publication.me', 'https://darylshaw.co.uk');
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.store', github);

// Create a server
const server = indiekit.server();

// Export server

export default server;
