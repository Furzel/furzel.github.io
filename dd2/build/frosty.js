var FrostyCalculator = React.createClass({
  displayName: 'FrostyCalculator',

  getInitialState: function () {
    return {
      result: undefined,
      defensePower: undefined,
      frostyPower: undefined
    };
  },

  render: function () {
    return React.createElement(Calculator, { title: 'Frostbite tower',
      inputs: [{ img: 'img/defense_power.png', label: 'Defense power', updateCallback: this.defensePowerUpdate, value: this.state.defensePower }, { img: 'img/frosty_weapon.png', label: 'Frosty power', updateCallback: this.frostyPowerUpdate, value: this.state.frostyPower }],
      result: { img: 'img/frosty.png', label: 'Frosty defense power bonus', value: this.state.result },
      resetHandler: this.reset });
  },

  defensePowerUpdate: function (value) {
    this.setState({ defensePower: value });
    setTimeout(this.computeResult, 0);
  },

  frostyPowerUpdate: function (value) {
    this.setState({ frostyPower: value });
    setTimeout(this.computeResult, 0);
  },

  computeResult: function () {
    if (!this.state.defensePower || !this.state.frostyPower) return;

    var auraPower = this.state.defensePower * this.state.frostyPower / 100;

    this.setState({ result: auraPower });
  },

  reset: function () {
    this.setState({
      result: undefined,
      defensePower: undefined,
      frostyPower: undefined
    });
  }
});

ReactDOM.render(React.createElement(FrostyCalculator, null), document.getElementById('content'));