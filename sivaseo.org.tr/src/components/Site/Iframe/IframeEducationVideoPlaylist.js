import React from 'react'
import url from 'url'

const IframeEducationVideoPlaylist = (props) => {

    const parsedUrl = new URL(props.education_video_playlist.education_video_playlist_url)
    const youtubePlaylistId = parsedUrl.searchParams.get('list')

    return(
        <iframe width="100%" height="405" src={"https://www.youtube.com/embed/?listType=playlist&list="+youtubePlaylistId+""} frameborder="0" allowfullscreen />
    )
}

export default IframeEducationVideoPlaylist