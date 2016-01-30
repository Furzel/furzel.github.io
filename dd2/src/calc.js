var createBus = function () {
  var eventCallbacks = {};

  return {
    subscribe: function (eventName, id, callback) {
      if (!eventCallbacks[eventName])
        eventCallbacks[eventName] = {};

      eventCallbacks[eventName][id] = callback;
    },

    unsubscribe: function (eventName, id) {
      if (!eventCallbacks[eventName])
        return

      if (!eventCallbacks[eventName][id])
        return;

      eventCallbacks[eventName][id] = null;
    },

    send: function (eventName, data) {
      if (!eventCallbacks[eventName])
        return;

      for (var key in eventCallbacks[eventName]) {
        eventCallbacks[eventName][key](data);
      }
    }
  }
}

var NumericInput = React.createClass({
  componentDidMount: function () {
    var input = this.refs.input,
        key = this.props.img;

    this.props.bus.subscribe('reset', this.props.img, function () {
      input.value = undefined;
    });
  },

  componentWillUnmount: function () {
    this.props.bus.unsubscribe('reset', this.props.key);
  },

  render: function () {
    return (
      <div className="numericInput">
        <div className="label">
          <p>{this.props.label}</p>
        </div>
        <div className="input-field">
          <img src={this.props.img} style={{'backgroundColor': 'black'}} />
          <input type="number" onChange={this.onChange} value={this.props.value} ref="input"/>
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
  bus: createBus(),

  generateInputs: function (inputs) {
    var key = 0,
        eventBus = this.bus;

    return inputs.map(function (input) {
      return (
        <NumericInput key={key++} img={input.img} label={input.label} updateCallback={input.updateCallback} bus={eventBus}/>
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
                   resetHandler={this.reset}/>
    </div>
    );
  },

  reset: function () {
    this.bus.send('reset');
    this.props.resetHandler();
  }
});