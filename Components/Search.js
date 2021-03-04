import React from 'react'
import {StyleSheet,View,Button,TextInput,FlatList, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './filmItem'
import  {getFilms} from '../API/TMDB'
import {connect} from 'react-redux'
import FilmList from './FilmList'

class Search extends React.Component{

    // constructeur
    constructor(props){
        super(props)
        this.state = {
            films:[],
            isloading:false
        }
        this.page = 0
        this.totalPage = 0
        this.textSearch = ""
        this.load_films = this.load_films.bind(this)
    }

    // chargement des films depuis l'api  
    load_films(){
        if (this.textSearch.length > 0){
            this.setState({isloading:true})
            getFilms(this.textSearch,this.page+1).then(
                data => {
                    this.page = data.page
                    this.totalPage = data.total_pages
                    this.setState({
                        films:[...this.state.films,...data.results],
                        isloading:false
                    })
                })
        }
    }

    // Nouvelle recherche
    _newSearch(){
        this.page = 0
        this.totalPage = 0
        this.setState({
            film:[]
        },()=>{
            this.load_films()
        })
    }

    // saisie de l'utilisateur
    input(text){
      this.textSearch = text
    }

    // chargement
    loading(){
        if(this.state.isloading){
          return(
              <View style={styles.loading}>
                  <ActivityIndicator size='large'/>
              </View>
          )
        }
    }

    // details des films
    _detailsFilms = (idFilm) => {
        this.props.navigation.navigate("FilmDetails",{idFilm:idFilm})
    }

   

     
    render(){
        console.log('Rendu'); 
        return(
            <View>
                <TextInput style={styles.textinput} onSubmitEditing={() => this._newSearch()} onChangeText={(text) => this.input()} placeholder='Titre du film'/>
                <Button style={styles.btn}  title='Rechercher' onPress={() => this._newSearch()}/>
                <FilmList 
                    films={this.state.films}
                    navigation={this.props.navigation}
                    load_films={this.load_films}
                    page={this.page}
                    totalPage={this.totalPage}
                    favoriteList={false}
                />
                 {this.loading()}
            </View>
        )
    }
}


//Styles
const styles = StyleSheet.create({

    main_container:{
        marginTop:20,
        flex:1
    }, 
    btn:{
        marginLeft:5,
        marginRight:5,
    },
    textinput:{
       marginLeft:5,
       marginRight:5,
       height:50,
       borderColor:'#000000',
       borderWidth:1,
       paddingLeft:5
    },
    loading:{
        flex:1,
        top:100,
        alignItems:'center',
        justifyContent:'center',
    }
})


export default Search