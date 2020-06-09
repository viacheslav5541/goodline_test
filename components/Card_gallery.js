import React, { Component } from 'react';
import {
    Image,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const d_width = Dimensions.get('window').width;
const d_height = Dimensions.get('window').height;

const categories = ['popular','upcoming','fresh_today','fresh_yesterday'];

export default class Card_gallery extends Component {

    static navigationOptions = {
        header:null
    };

    constructor(props) {
        super(props);
        this.state = {
            images_loading:false,
            images_array:[],
            selected_category:'popular',
            current_page:1,
            max_page:10000
        }
    }

    upload_images(){
        this.setState({image_loading:true});
        fetch(`https://api.500px.com/v1/photos?feature=${this.state.selected_category}&page=${this.state.current_page}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({images_array:res.photos,max_page:res.total_pages},()=>{
                    this.setState({image_loading:false});
                });
            })
            .catch(() => {
                this.setState({image_loading:false});
            })
    }

    componentDidMount(): void {
        this.upload_images();
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style = {{flex:1}}>
                <View style = {page.header}>
                    <Text style = {page.header_text}>Choose your category</Text>
                    <View style = {page.header_categories}>
                        {categories.map((item,index)=>{
                            return(
                                <TouchableOpacity onPress = {()=>{this.setState({selected_category:item,current_page:1},()=>this.upload_images())}} key = {index}>
                                        <Text style = {item!=this.state.selected_category?page.header_categories_text:page.header_selected_category_text}>{item.toUpperCase()}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                {this.state.image_loading?
                    <ActivityIndicator style = {{flex:6,alignSelf:'center'}} size="large" color="#0000ff"/>
                    :
                    <View style = {{flex:6}}>
                        <View style = {{flexDirection:'row',justifyContent: 'space-around',marginBottom:5}}>
                            {this.state.current_page!=1?
                                <TouchableOpacity onPress = {()=>{this.setState({current_page:this.state.current_page - 1},() => {this.upload_images()})}}>
                                    <Text style = {{fontSize:20,marginRight:'auto',marginLeft:20,fontWeight:'bold'}}>{'<Back'}</Text>
                                </TouchableOpacity>:null
                            }
                            {this.state.current_page!=this.state.max_page?
                                <TouchableOpacity onPress = {()=>{this.setState({current_page:this.state.current_page + 1},()=>{this.upload_images()})}}>
                                    <Text style = {{fontSize:20,marginLeft:'auto',marginRight:20,fontWeight:'bold'}}>{'Next>'}</Text>
                                </TouchableOpacity>:null
                            }
                        </View>
                        <ScrollView>
                            <View style = {{width:d_width,flexDirection:'row',flexWrap:'wrap'}}>
                                {this.state.images_array.map(item=>{
                                    return(
                                        <TouchableOpacity onPress = {()=>navigate('Full_Image',{url:item.image_url[0]})} style = {{marginRight:'auto',marginLeft:'auto',marginTop: 10,marginBottom:10}}>
                                            <Image style = {{width:d_width/2.2,height:d_height/3}} source={{uri:item.image_url[0]}}/>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>}
            </View>
        );
    }
}


const page = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: 'white',
    },
    header_categories:{
        flex:1,
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    header_text: {
        fontSize: 30,
        color: 'black',
        marginLeft:10,
        fontWeight:'bold'
    },
    header_categories_text: {
        fontSize: 13,
        color: 'black',
    },
    header_selected_category_text:{
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    }
});
