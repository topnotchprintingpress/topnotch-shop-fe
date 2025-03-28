"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Loader from "../custom/Loader";

// YouTube video type definition
interface YouTubeVideo {
  id: string;
  title: string;
  videoId: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeAPIItem {
  id: string;
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    };
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
      default: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
    };
    publishedAt: string;
  };
}

const YouTubeVideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        const formattedVideos: YouTubeVideo[] = data.items
          .filter((item: YouTubeAPIItem) => {
            const title = item.snippet.title.toLowerCase();
            const thumbnails = item.snippet.thumbnails;
            const thumbnail =
              thumbnails?.standard || thumbnails?.medium || thumbnails?.default;

            // Exclude Shorts: Check if title contains "#shorts" or if the thumbnail is taller than wide
            return (
              !title.includes("#shorts") &&
              thumbnail?.width >= thumbnail?.height
            );
          })
          .map((item: YouTubeAPIItem) => ({
            id: item.id,
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: new Date(
              item.snippet.publishedAt
            ).toLocaleDateString(),
          }));

        setVideos(formattedVideos);
        setIsLoading(false);
      } catch {
        setError("Failed to load videos");
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(videos.length / videosPerPage);

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{ backgroundColor: "#fffcf7" }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center min-h-screen text-center p-4"
        style={{ backgroundColor: "#fffcf7" }}
      >
        <div className="text-[#350203]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="#350203"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.569V8.431L15.818 12l-6.272 3.569z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 space-y-8"
      style={{ backgroundColor: "#fffcf7" }}
    >
      <h3
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ color: "#350203" }}
      >
        Topnotch Online Tv{" "}
      </h3>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <Card
            key={video.id}
            className="hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-[#350203]"
          >
            <CardHeader className="p-0 relative border-b">
              <div className="relative group">
                <Image
                  width={400}
                  height={225}
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50"
                >
                  <Play
                    className="text-white w-16 h-16 drop-shadow-lg"
                    fill="#ffffff"
                  />
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <CardTitle
                className="text-lg font-semibold line-clamp-2"
                style={{ color: "#350203" }}
              >
                {video.title}
              </CardTitle>
              <p
                className="text-sm text-muted-foreground"
                style={{ color: "#350203aa" }}
              >
                Published: {video.publishedAt}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-3xl hover:bg-[#350203] hover:text-[#fffcf7]"
                >
                  Watch Video
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button
          variant="outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            borderColor: "#350203",
            color: "#350203",
            backgroundColor: "transparent",
          }}
        >
          Previous
        </Button>

        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              onClick={() => paginate(1)}
              style={{
                borderColor: "#350203",
                color: "#350203",
                backgroundColor: "transparent",
              }}
            >
              1
            </Button>
            {currentPage > 4 && <span className="text-[#350203]">...</span>}
          </>
        )}

        {[...Array(Math.min(3, totalPages))].map((_, index) => {
          const pageNumber =
            currentPage <= 3 ? index + 1 : currentPage - 1 + index;

          if (pageNumber > totalPages) return null;

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              onClick={() => paginate(pageNumber)}
              style={{
                backgroundColor:
                  currentPage === pageNumber ? "#350203" : "transparent",
                color: currentPage === pageNumber ? "#fffcf7" : "#350203",
                borderColor: "#350203",
              }}
            >
              {pageNumber}
            </Button>
          );
        })}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="text-[#350203]">...</span>
            )}
            <Button
              variant="outline"
              onClick={() => paginate(totalPages)}
              style={{
                borderColor: "#350203",
                color: "#350203",
                backgroundColor: "transparent",
              }}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            borderColor: "#350203",
            color: "#350203",
            backgroundColor: "transparent",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default YouTubeVideoGallery;
