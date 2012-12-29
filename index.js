var Dice = function(phrase) {
    this.phrase = phrase;
    this.dice = [];
    this.named_dice = [];
    this.parse();
};

(function () {
    this.parse = function () {
        var dice = this.phrase;
        var dice = dice.replace(/- */,'+ -');
        var dice = dice.replace(/D/,'d');
        var re = / *\+ */;
        var items = dice.split(re);
        for ( var i=0; i<items.length; i++) {
            var match = items[i].match(/^[ \t]*(-)?(\d+)?(?:(d)(\d+))?[ \t]*$/);
            if (match) {
                var sign = match[1]?-1:1;
                var num = parseInt(match[2] || "1");
                var max = parseInt(match[4] || "0");
                if (match[3]) {
                    this.dice.push([sign, num, max]);
                    this.named_dice.push(sign * num + 'd' + max);
                } else {
                    this.dice.push([sign, num]);
                    this.named_dice.push(sign * num);
                }
            } else {
                return null;
            }
        }
    };

    this.roll = function() {
        var total = 0;
        var results = [];
        var die;
        var j, d;
        for (var didx in this.dice) {
            die = this.dice[didx];
            if (die.length === 3) {
                for (j=1; j<=die[1]; j++) {
                    d = die[0] * Math.ceil(die[2]*Math.random());
                    results.push(d);
                    total += d;
                }
            } else {
                d = die[0] * die[1];
                results.push(d);
                total += d;
            }
        };
        return {results: results, total: total};
    };

}).call(Dice.prototype);

module.exports = Dice;

