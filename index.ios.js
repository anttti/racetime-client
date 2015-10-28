var React = require("react-native");
var moment = require("moment");

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput
} = React;

var Firebase = require("firebase");

const racetimeclient = React.createClass({
    componentWillMount() {
        this.firebaseRef = new Firebase("https://brilliant-torch-3113.firebaseio.com/entries/");
    },
    addEntry() {
        const time = moment(this.state.time, "mm:ss:SS");
        if (!time.isValid()) {
            console.log("invalid time");
            return;
        }

        this.firebaseRef.push(this.state);
        this.setState(this.getInitialState());
    },
    onChange(field, value) {
        this.setState({ [field]: value });
    },
    getInitialState() {
        return {
            time: "",
            name: ""
        };
    },
    render: function() {
        return (
            <View>
                <Text style={styles.header}>
                    RaceTime!
                </Text>
                <TextInput style={styles.input} onChangeText={this.onChange.bind(null, "time")} value={this.state.time} />
                <TextInput style={styles.input} onChangeText={this.onChange.bind(null, "name")} value={this.state.name} />
                <TouchableHighlight style={styles.button} onPress={this.addEntry}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        textAlign: "center",
        margin: 30,
    },
    input: {
        height: 36,
        padding: 4,
        margin: 5,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
    },
    button: {
        height: 36,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#48afdb",
        borderRadius: 4,
        margin: 5
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF"
    }
});

AppRegistry.registerComponent("racetimeclient", () => racetimeclient);
