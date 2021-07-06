import { makeStyles } from "@material-ui/core"
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
    root:{
        width:'100%',
        },
        thumb:{
            color:'#000'
        },
        rail:{
            color:'#000'
        },
        track:{
            color:'#000',
        }
})

const SliderProton = ({value,changedPrice}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Slider
                value={value}
                onChange={changedPrice}
                valueLabelDisplay = "on"
                min={1000}
                max={5000}
                classes={
                    {
                        thumb:classes.thumb,
                        rail:classes.rail,
                        track:classes.track,
                    }
                }
            />        
        </div>
    )
}

export default SliderProton
