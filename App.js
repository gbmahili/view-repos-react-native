import React from 'react';
import { Text, View, Button, FlatList, Linking, Image, TextInput } from 'react-native';
import ListItem from './src/Components/ListItem';

export default class App extends React.Component {

    state = {
        repos: [],
        loading: false,
        githubUsername: '',
        errorMessage: '',
        reset: true

    }

    fetchGitHubRepos = () => {

        this.setState({ reset: false })

        let githubReposUrl = `https://api.github.com/users/${this.state.githubUsername}/repos`;
        if (this.state.githubUsername !== '') {

            fetch(githubReposUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.message) {
                        this.setState({
                            errorMessage: data.message,
                            loading:false
                        })
                    }
                    else {
                        this.setState({
                            repos: data,
                            loading: true
                        }
                        )

                    }
                });

        } else {
            console.log("Please enter a GitHub username")
        }

    }

    openLink = html_url => {
        console.log(html_url)
        Linking.openURL(html_url);
    }

    _prettify = str => {
        // Remove --
        return str.replace(/-/g, " ").toUpperCase();
    }

    render() {
        return (
            <View>
                <View style={styles.headerStyle}>
                    <Text style={{ color: 'white' }}>CNN Code</Text>
                </View>

                <View style={styles.mainContent}>

                    {
                        this.state.reset &&
                        < Text style={styles.headerText}>
                            Say you wanted to check someone's repository on Github. Don't you wish there was a way to get to them quickly?
                            By just typing their uername, you can check out all their repos and navigate to each one of them.

                            That is the purpose of this app.
                        </Text>
                    }


                    {


                        // this.state.init &&

                        this.state.loading

                            ?

                            <View style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image
                                    style={{ width: 75, height: 75, borderRadius: 1000, marginBottom: 30 }}
                                    source={{ uri: this.state.repos[0].owner.avatar_url }}
                                />
                                <FlatList
                                    style={{ width: 300 }}
                                    data={this.state.repos}
                                    renderItem={({ item }) => <ListItem itemName={this._prettify(item.name)} openLink={() => this.openLink(item.html_url)} />}
                                    keyExtractor={(item) => item.node_id}
                                />
                            </View>



                            :

                            <Text>{this.state.errorMessage}</Text>




                    }

                </View>

                <View style={{ padding: 20 }}>
                    <TextInput
                        value={this.state.githubUsername}
                        onChangeText={(text) => this.setState({ githubUsername: text })}
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5, padding: 5 }}
                    />
                    <Button
                        onPress={this.fetchGitHubRepos}
                        title="Get Repos"
                        color="blue"
                        accessibilityLabel="Get repos from Github API"
                        style={{
                            margin: 20,
                            borderRadius: 20
                        }}
                    />
                </View>


            </View >

        );
    }
}

const styles = {
    headerStyle: {
        backgroundColor: 'black',
        padding: 10,
        marginTop: 21,
        display: 'flex',
        alignItems: 'center',
    },
    headerText: {
        color: 'black'
    },
    mainContent: {
        backgroundColor: 'white',
        height: 400,
        display: 'flex',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
