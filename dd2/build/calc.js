var createBus = function () {
  var eventCallbacks = {};

  return {
    subscribe: function (eventName, id, callback) {
      if (!eventCallbacks[eventName]) eventCallbacks[eventName] = {};

      eventCallbacks[eventName][id] = callback;
    },

    unsubscribe: function (eventName, id) {
      if (!eventCallbacks[eventName]) return;

      if (!eventCallbacks[eventName][id]) return;

      eventCallbacks[eventName][id] = null;
    },

    send: function (eventName, data) {
      if (!eventCallbacks[eventName]) return;

      for (var key in eventCallbacks[eventName]) {
        eventCallbacks[eventName][key](data);
      }
    }
  };
};

var NumericInput = React.createClass({
  displayName: 'NumericInput',

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
    return React.createElement(
      'div',
      { className: 'numericInput' },
      React.createElement(
        'div',
        { className: 'label' },
        React.createElement(
          'p',
          null,
          this.props.label
        )
      ),
      React.createElement(
        'div',
        { className: 'input-field' },
        React.createElement('img', { src: this.props.img, style: { 'backgroundColor': 'black' } }),
        React.createElement('input', { type: 'number', onChange: this.onChange, value: this.props.value, ref: 'input' })
      )
    );
  },

  onChange: function (event) {
    if (!event.target || !event.target.value) return;

    var value = parseFloat(event.target.value);
    this.props.updateCallback(value);
  }
});

var ResultInput = React.createClass({
  displayName: 'ResultInput',

  render: function () {
    return React.createElement(
      'div',
      { className: 'resultInput' },
      React.createElement(
        'div',
        { className: 'label' },
        React.createElement(
          'p',
          null,
          this.props.label
        )
      ),
      React.createElement(
        'div',
        { className: 'result-field' },
        React.createElement('img', { src: this.props.img }),
        React.createElement('input', { type: 'text', value: this.props.value })
      ),
      React.createElement(
        'div',
        { className: 'reset-button' },
        React.createElement(
          'button',
          { onClick: this.props.resetHandler },
          'Reset'
        )
      )
    );
  }
});

var Calculator = React.createClass({
  displayName: 'Calculator',

  bus: createBus(),

  generateInputs: function (inputs) {
    var key = 0,
        eventBus = this.bus;

    return inputs.map(function (input) {
      return React.createElement(NumericInput, { key: key++, img: input.img, label: input.label, updateCallback: input.updateCallback, bus: eventBus });
    });
  },

  render: function () {
    return React.createElement(
      'div',
      { className: 'calculator' },
      React.createElement(
        'div',
        { className: 'calculator-title' },
        React.createElement(
          'h1',
          null,
          this.props.title
        )
      ),
      React.createElement('hr', null),
      this.generateInputs(this.props.inputs),
      React.createElement('hr', null),
      React.createElement(ResultInput, { img: this.props.result.img,
        label: this.props.result.label,
        value: this.props.result.value,
        resetHandler: this.reset })
    );
  },

  reset: function () {
    this.bus.send('reset');
    this.props.resetHandler();
  }
});