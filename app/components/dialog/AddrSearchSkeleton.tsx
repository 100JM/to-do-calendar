import Skeleton from '@mui/material/Skeleton';

const AddrSearchSkeleton: React.FC = () => {
    return (
        <div className="w-full h-full grid items-center">
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton variant="circular" width="10%" height={30} animation="wave" sx={{ maxWidth: "32px" }} />
                <div className='w-full ml-1'>
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" sx={{ marginBottom: "6px" }} />
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" />
                </div>
            </div>
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton variant="circular" width="10%" height={30} animation="wave" sx={{ maxWidth: "32px" }} />
                <div className='w-full ml-1'>
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" sx={{ marginBottom: "6px" }} />
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" />
                </div>
            </div>
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton variant="circular" width="10%" height={30} animation="wave" sx={{ maxWidth: "32px" }} />
                <div className='w-full ml-1'>
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" sx={{ marginBottom: "6px" }} />
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" />
                </div>
            </div>
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton variant="circular" width="10%" height={30} animation="wave" sx={{ maxWidth: "32px" }} />
                <div className='w-full ml-1'>
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" sx={{ marginBottom: "6px" }} />
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" />
                </div>
            </div>
            <div className="w-full h-full flex justify-between items-center">
                <Skeleton variant="circular" width="10%" height={30} animation="wave" sx={{ maxWidth: "32px" }} />
                <div className='w-full ml-1'>
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" sx={{ marginBottom: "6px" }} />
                    <Skeleton variant="rounded" width="100%" height={10} animation="wave" />
                </div>
            </div>
        </div>
    );
};

export default AddrSearchSkeleton;