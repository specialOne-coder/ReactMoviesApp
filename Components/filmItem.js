import React from 'react'
import {StyleSheet,View,Image,Text,TouchableOpacity} from 'react-native'
import  {getImages} from '../API/TMDB'


class FilmItem extends React.Component{

    // favoris ou pas
    _favorisOuPas = () =>{
      if(this.props.favoris){
         return(
            <Image
            source={require('../Images/heart.png')}
            style={styles.favorite_image}
            />
         )
      }
   }


    render(){
        const {film,versDetails} = this.props
        return(
            <TouchableOpacity style={styles.main_container}
                onPress={() => versDetails(film.id)}>
                <Image
                   style={styles.image}
                   source={{uri:getImages(film.poster_path)}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                       {this._favorisOuPas()}
                       <Text style={styles.title_text}>{film.title}</Text>
                       <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                       <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                       <Text style={styles.date_text} >{film.release_date} </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flexDirection:'row',
        height:190,
    },
    image:{
       width:120,
       height:180,
       margin:5,
       backgroundColor:'gray',
    },
    content_container:{
       flex:1,
       margin:5
    },
    header_container:{
      flexDirection:"row",
      flex:3
    },
    title_text:{
       flex:1,
       fontWeight:'bold',
       fontSize:15,
       flexWrap:'wrap',
       paddingRight:5
    },
    vote_text:{
        fontWeight:'bold',
        fontSize:26,
        color:"#666666"
    },
    description_container:{
       flex:7
    },
    description_text:{
        color:"#666666",
        fontStyle:'italic'
    },
    date_container:{
       flex:1
    },
    date_text:{
       textAlign:'right',
       fontSize:14
    }
})

//association des données du state global aux props du component fimItem

export default  FilmItem