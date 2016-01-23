var NumericInput = React.createClass({
  render: function () {
    return (
      <div className="numericInput">
        <div className="label">
          <p>{this.props.label}</p>
        </div>
        <div className="input-field">
          <img src={this.props.img} style={{'backgroundColor': 'black'}} />
          <input type="number" onChange={this.onChange} value={this.props.value} />
        </div>
      </div>
    );
  },

  onChange: function (event) {
    if (!event.target || !event.target.value)
      return;

    var value = parseFloat(event.target.value);
    this.props.updateCallback(value);
  }
});

var ResultInput = React.createClass({
  render: function () {
    return (
      <div className="resultInput">
        <div className="label">
          <p>{this.props.label}</p>
        </div>
        <div className="result-field">
          <img src={this.props.img} />
          <input type="text" value={this.props.value}/ >
        </div>
        <div className="reset-button">
          <button onClick={this.props.resetHandler}>Reset</button>
        </div>
      </div>
    );
  }
})

var Calculator = React.createClass({
  generateInputs: function (inputs) {
    var key = 0;

    return inputs.map(function (input) {
      return (
        <NumericInput key={key++} img={input.img} label={input.label} updateCallback={input.updateCallback} value={input.value}/>
      );
    });
  },

  render: function () {
    return (
    <div className="calculator">
      <div className="calculator-title">
        <h1>{this.props.title}</h1>
      </div>
      <hr />
      {this.generateInputs(this.props.inputs)}
      <hr />
      <ResultInput img={this.props.result.img} 
                   label={this.props.result.label} 
                   value={this.props.result.value}
                   resetHandler={this.props.resetHandler}/>
    </div>
    );
  },
});