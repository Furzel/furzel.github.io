var SerenityCalculator = React.createClass({
  displayName: 'SerenityCalculator',

  getInitialState: function () {
    return {
      result: undefined,
      defensePower: undefined,
      purgeEvilPower: undefined
    };
  },

  render: function () {
    return React.createElement(Calculator, { title: 'Serenity aura',
      inputs: [{ img: 'img/defense_power.png', label: 'Defense power', updateCallback: this.defensePowerUpdate }, { img: 'img/serenity_weapon.png', label: 'Purge evil power', updateCallback: this.purgeEvilPowerUpdate }],
      result: { img: 'img/serenity.png', label: 'Serenity explosion damage', value: this.state.result },
      resetHandler: this.reset });
  },

  defensePowerUpdate: function (value) {
    if (!value) return;

    this.setState({ defensePower: value });
    setTimeout(this.computeResult, 0);
  },

  purgeEvilPowerUpdate: function (value) {
    if (!value) return;

    this.setState({ purgeEvilPower: value });
    setTimeout(this.computeResult, 0);
  },

  computeResult: function () {
    if (!this.state.defensePower || !this.state.purgeEvilPower) return;

    var auraPower = this.state.defensePower * this.state.purgeEvilPower / 100;

    this.setState({ result: auraPower });
  },

  reset: function () {
    this.setState({
      result: undefined,
      defensePower: undefined,
      purgeEvilPower: undefined
    });
  }
});

ReactDOM.render(React.createElement(SerenityCalculator, null), document.getElementById('content'));