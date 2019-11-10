var name = "outer";
var obj = {
	name : "inner",
	getName : function (argument) {
		// bod
		return this.name;
	}
};