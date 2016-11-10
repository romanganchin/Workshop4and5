import React from 'react';
import FeedItem from './feeditem';
import StatusUpdateEntry from './statusupdateentry';
import {postStatusUpdate, getFeedData} from '../server';

export default class Feed extends React.Component {
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place
    // you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not
    // trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty feed.
      contents: []
    };
  }
  refresh(){
    getFeedData(this.props.user, (feedData)=>{
      this.setState(feedData);
    })
  }
  onPost(postContents){
    postStatusUpdate(4,"Amherst, MA", postContents, ()=>{
      this.refresh();
    });
  }
  componentDidMount() {
    this.refresh();
  }

  render(){
    return(
      <div>
        <StatusUpdateEntry onPost={(postContents)=>this.onPost(postContents)}/>
        {this.state.contents.map((feeditem)=>{
          return (
            <FeedItem key={feeditem._id} data={feeditem} />
          );
        })}
      </div>
    );
  }

}
