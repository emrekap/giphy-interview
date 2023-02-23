/* eslint-disable @next/next/no-img-element */

export default function GifImage(props) {
    return <div>
        <img src={props.image.url} alt={props.title} width={props.image.width} height={props.image.height} />
    </div>
}

// v-furkan.ilgenci@kajabi.com