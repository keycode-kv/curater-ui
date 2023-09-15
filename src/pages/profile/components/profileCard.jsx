import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProfileField from './profileField';
import { makeStyles } from '@material-ui/core/styles';
import ColoredContainer from './colouredContainer.';


const useStyles = makeStyles((theme) =>({
    detailCard: {
      border:`5px solid #4E157A`,
      borderRadius:10
    },
    statsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:40
    }
  }));

const ProfileCard = ({ user }) => {
    const classes=useStyles();
  return (
    <Card className={classes.detailCard}>
      <CardContent >
        {/* Display user profile details here */}
        <ProfileField label='Name' value={user.name}/>
        <ProfileField label ='Email' value={user.email}/>
        <ProfileField label ='Password' value='**********'/>
        <div className={classes.statsContainer}>
            <ColoredContainer text={`${user.article_count} Articles`} />
            <ColoredContainer text='500 Comments'/>
            <ColoredContainer text='300 Hours'/>
        </div>
        {/* Add more profile details as needed */}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;