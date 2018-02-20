this.router.route('/')
  .get(this.controller.getAll)
  .post(this.controller.insert);

this.router.route("id/:id")
  .get(this.controller.findbyID)
  .put(this.controller.update)
  .delete(this.controller.remove);
