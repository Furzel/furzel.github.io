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
      inputs: [{ img: 'img/defense_power.png', label: 'Defense power', updateCallback: this.defensePowerUpdate, value: this.state.defensePower }, { img: 'img/serenity_weapon.png', label: 'Purge evil power', updateCallback: this.purgeEvilPowerUpdate, value: this.state.purgeEvilPower }],
      result: { img: 'img/serenity.png', label: 'Serenity explosion damage', value: this.state.result },
      resetHandler: this.reset });
  },

  defensePowerUpdate: function (value) {
    this.setState({ defensePower: value });
    setTimeout(this.computeResult, 0);
  },

  purgeEvilPowerUpdate: function (value) {
    this.setState({ purgeEvilPower: value });
    setTimeout(this.computeResult, 0);
  },

  computeResult: function () {
    if (!this.state.defensePower || !this.state.purgeEvilPower) return;

    console.log('defensePower', this.state.defensePower, 'purgeEvil', this.state.purgeEvilPower);

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