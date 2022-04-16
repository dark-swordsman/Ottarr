# TODO

- remove sidebar and move nav to top
- upgrade file manager
  - mainly separate component, if not already
  - UI improvement maybe?
- create "task" interface
  - tasks are "events" that have a state
  - this state helps determine events that haven't happened
  - because of this, we can queue events that
    - have a low confidence
    - are locked to queue-only and manual review
    - queue events/save as draft that were paused (like clicking away from a modal maybe)
  - drafts can have a custom-defined expiry date
  - ideally all events go through this interface in order to do something, like middleware, though it's mainly for file operations
