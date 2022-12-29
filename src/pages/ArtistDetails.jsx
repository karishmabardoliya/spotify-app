import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";

const ArtistDetails = () => {
	const { id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player)
	const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
	const featureData = artistData?.data?.[0]?.views?.['playlists']?.data;

	if (isFetchingArtistDetails) return
	<Loader title="Loading artist details" />;

	if (error) return <Error />;
	return (
		<div className="flex flex-col">
			<DetailsHeader
				artistId={artistId}
				artistData={artistData}
			/>
			<RelatedSongs
				data={featureData}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	)
};

export default ArtistDetails;
