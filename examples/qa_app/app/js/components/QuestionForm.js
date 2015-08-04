var React = require('react');

module.exports = React.createClass({
  handleForm: function(e){
    e.preventDefault();
    var newQuestion = {
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
      voteCount: 0,
    }

    this.refs.addQuestionForm.getDOMNode().reset();

    this.props.onNewQuestion( newQuestion );
  },
  render: function(){
    var styleObj = {
      display: this.props.formDisplayed ? 'block' : 'none'
    }
    return (
      <form ref="addQuestionForm" name="addQuestion" className="clearfix" style={ styleObj } onSubmit={this.handleForm}>
        <div className="form-group">
          <label htmlFor="qtitle">问题</label>
          <input ref="title" type="text" className="form-control" id="qtitle" placeholder="您的问题的标题" />
        </div>
        <textarea ref="description" rows="3" className="form-control" placeholder="问题的描述"></textarea>
        <button className="btn btn-success pull-right">确认</button>
        <button className="btn btn-default pull-right" onClick={this.props.onToggleForm}>取消</button>
      </form>
    )
  }
})
