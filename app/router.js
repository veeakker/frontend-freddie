import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('product-groups', function() {
    this.route('show', { path: "/:product_group_id" });
  });
});

export default Router;
