import "../style/KoFi.css";

export default function KoFi(props) {
	const { color, label } = props;
	return (
		<div className="btn-container">
			<a
				title={label}
				className="kofi-button"
				style={{ backgroundColor: color }}
				href={"https://ko-fi.com/joshfryer"}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="kofitext">
					<img
						src="https://ko-fi.com/img/cup-border.png"
						className="kofiimg"
						alt="Ko-Fi button"
					/>
					{label}
				</span>
			</a>
		</div>
	);
}
