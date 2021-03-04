import React from 'react'
import {StyleSheet,View,ActivityIndicator,Image,Text,ScrollView,TouchableOpacity } from 'react-native'
import FilmItem from './filmItem'
import  {getFilm, getImages} from '../API/TMDB'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'


class FilmDetails extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            film:undefined,
            isloading:true
        }
        //recuperation de l'id  envoyé
        this.id = this.props.navigation.state.params.idFilm
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

    // recuperation du film à la mort du component
    componentDidMount(){
       const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
       if(favoriteFilmIndex !== -1){
           this.setState({
               film:this.props.favoritesFilm[favoriteFilmIndex]
           })
           return
       }
       this.setState({isloading:true})
        getFilm(this.id).then(
            data => {
                this.setState({
                    film:data,
                    isloading:false
                })
            }
        )
    }

    //vers favoris ou pas
    _toFavoris(){
        const action = {type:'Toggle_Favorite',value:this.props.film}
        this.props.dispatch(action)
    }

    //images si favoris ou pas
    _favoritesImages(){
        var sourceImage = require('../Images/emptyheart.png')
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
            sourceImage = require('../Images/heart.png')
        }
        <Image
          source={sourceImage}
          style={styles.favorite_image}
         />
    }

    // Affichage du film
    afficherFilm(){
        const film = this.props.film
        if(film!= undefined){
            return(
                <View>
                    <ScrollView style={styles.scroll_container}>
                       <Image style={styles.image}
                              source={{uri:getImages(film.backdrop_path)}}
                        />
                        <Text style={styles.title_text}>
                              {film.title}
                        </Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={()=>this._toFavoris()}>
                            {this._favoritesImages()}
                        </TouchableOpacity>
                        <Text style={styles.description_text}>
                              {film.overview}
                        </Text>
                        <Text style={styles.default_text}>
                              Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={styles.default_text}>
                              Vote : {film.vote_count}
                        </Text>
                        <Text style={styles.default_text}>
                              Budget du film :{numeral(film.budget).format('0.0[.]00$')}
                        </Text>
                        <Text style={styles.default_text}>
                              Genre : {film.genres.map((genre)=>{
                                           return genre.name;
                                       }).join('/')}
                        </Text>
                        <Text style={styles.default_text}>
                              Compagnies : {film.production_compagnies.map((compagny)=>{
                                           return compagny.name;
                                       }).join('/')}
                        </Text>

                    </ScrollView>
                </View>
            )
        }
    }

    render(){
        return (
            <View style={styles.main_container}>
               {this.afficherFilm()}
               {this.loading()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
    },
    loading:{
        flex:1,
        top:0,
        alignItems:'center',
        justifyContent:'center',
    },
    scroll_container:{
        flex:1
    },
    image:{
        height:169,
        margin:5
    },
    title_text:{
        fontWeight:'bold',
        fontSize:35,
        flex:1,
        flexWrap:'wrap',
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:10,
        color:'#000000',
        textAlign:'center'
    },
    description_text:{
        fontStyle:'italic',
        color:'#000000',
        margin:5,
        marginBottom:15
    },
    default_text:{
        marginLeft:5,
        marginRight:5,
        marginTop:5
    },
    favorite_container:{
        alignItems:'center'
    },
    favorite_image:{
        width:40,
        height:40
    }
})

//association des données du state global aux props du component filmDetail
const mapStateToProps = (state)=>{
    return {
        favoritesFilm:state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetails)