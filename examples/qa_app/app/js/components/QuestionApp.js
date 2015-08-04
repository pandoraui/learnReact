var React = require('react');
var ShowAddButton = require('./ShowAddButton.js')
var QuestionForm = require('./QuestionForm.js')
var QuestionList = require('./QuestionList.js')
var _ = require('lodash')

module.exports = React.createClass({
  getInitialState: function(){
    var questions = [
      {
        key: 1,
        title: '产品经理与程序员矛盾的本质是什么？',
        description: '理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接收来自其他部门的需求，经过设计后交付研发。但这有好些职责不清楚的地方。',
        voteCount: 5
      },
      {
        key: 2,
        title: '热爱编程是一种怎样的体验？',
        description: '别人对玩游戏感兴趣，我对写代码，看技术文章感兴趣：报泡 github、stackoverflow、v2ex、reddit、csdn 当做是兴趣爱好；遇到重复的功能，总想着能不能通过程序自动化；喝酒的事后把写代码当下酒菜，边和边想边敲；不给工资我也会来加班；做梦都在写代码。',
        voteCount: 3
      }
    ];

    questions = this.sortQuestion(questions);

    return {
      questions: questions,
      formDisplayed: false,
    }
  },
  onToggleForm: function(){
    this.setState({
      formDisplayed: !this.state.formDisplayed,
    })
  },
  onNewQuestion: function( newQuestion ){
    newQuestion.key = this.state.questions.length + 1;

    var newQuestions = this.state.questions.concat( newQuestion );

    newQuestions = this.sortQuestion( newQuestions );

    this.setState({
      questions: newQuestions
    })
  },
  sortQuestion: function(questions){
    questions.sort(function(a,b){
      return b.voteCount - a.voteCount
    })
    return questions;
  },
  onVote: function(key, newCount){
    var questions = _.uniq( this.state.questions );
    var index = _.findIndex(questions, function(qst){
      return qst.key == key
    })

    questions[index].voteCount = newCount;

    questions = this.sortQuestion(questions);

    this.setState({
      questions: questions
    })
  },
  render: function(){
    return (
      <div>
      <div className="jumbotron text-center">
        <div className="container">
          <h1>React 问答</h1>
          <ShowAddButton onToggleForm={this.onToggleForm} />
        </div>
      </div>
      <div className="main container">
        <QuestionForm 
            onNewQuestion={this.onNewQuestion}
            onToggleForm={this.onToggleForm}
            formDisplayed={this.state.formDisplayed} />
        
        <QuestionList questions={this.state.questions } onVote={this.onVote} />
      </div>
      </div>
    )
  }
})