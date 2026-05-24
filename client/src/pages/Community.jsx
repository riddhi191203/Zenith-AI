import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Heart,
  Sparkles,
  ImageIcon,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../lib/api";
import { useAuth } from "../context/auth";

const Community = () => {
  const [creations, setCreations] = useState([]);

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  // FETCH CREATIONS
  const fetchCreations = useCallback(async () => {
    try {
      const { data } = await api.get("/api/user/get-published-creations");

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }, []);

  // LIKE TOGGLE
  const imageLikeToggle = async (id) => {
    try {
      const { data } = await api.post(
        "/api/user/toggle-like-creation",
        { id }
      );

      if (data.success) {
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [fetchCreations, user]);

  // LOADER
  if (loading) {
    return (
      <div className="
        flex
        justify-center
        items-center
        h-full
        bg-slate-50
      ">
        <div className="
          w-14
          h-14
          rounded-full
          border-4
          border-blue-500
          border-t-transparent
          animate-spin
        "></div>
      </div>
    );
  }

  return (
    <section className="
      relative
      h-full
      overflow-y-auto
      bg-slate-50
      p-4
      lg:p-6
    ">
      <div className="relative z-10">

        {/* Header */}
        <div className="
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-6
          mb-10
        ">

          <div>
            <div className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/70
              border
              border-blue-100
              shadow-md
            ">
              <Sparkles className="
                w-4
                h-4
                text-blue-600
              " />

              <span className="
                text-sm
                font-medium
                text-slate-700
              ">
                Community Showcase
              </span>
            </div>

            <h1 className="
              mt-5
              text-4xl
              sm:text-5xl
              font-bold
              tracking-tight
              text-slate-900
            ">
              Explore{" "}
              <span className="
                bg-gradient-to-r
                from-blue-600
                to-slate-700
                bg-clip-text
                text-transparent
              ">
                AI Creations
              </span>
            </h1>

            <p className="
              mt-4
              max-w-2xl
              text-slate-600
              leading-relaxed
            ">
              Discover incredible AI-generated artwork
              created by the Zenith AI community.
              Like, explore, and get inspired.
            </p>
          </div>

          {/* Stats */}
          <div className="
            px-6
            py-4
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            shadow-lg
          ">
            <p className="
              text-sm
              text-slate-500
            ">
              Total Published
            </p>

            <h2 className="
              mt-1
              text-3xl
              font-bold
              text-slate-800
            ">
              {creations.length}
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {creations.length === 0 ? (
          <div className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            min-h-[500px]
            rounded-[40px]
            border
            border-white/50
            bg-white/60
            backdrop-blur-2xl
            shadow-[0_8px_40px_rgb(0,0,0,0.06)]
          ">

            <div className="
              w-28
              h-28
              rounded-3xl
              bg-gradient-to-r
              from-blue-100
              to-slate-100
              flex
              items-center
              justify-center
            ">
              <ImageIcon className="
                w-12
                h-12
                text-blue-600
              " />
            </div>

            <h2 className="
              mt-8
              text-2xl
              font-bold
              text-slate-800
            ">
              No Community Posts Yet
            </h2>

            <p className="
              mt-3
              max-w-md
              text-slate-500
              leading-relaxed
            ">
              Publish your AI-generated creations
              and inspire the Zenith AI community.
            </p>
          </div>
        ) : (
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8
          ">

            {creations.map((creation, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/50
                  bg-white/70
                  backdrop-blur-2xl
                  shadow-[0_8px_40px_rgb(0,0,0,0.06)]
                  hover:-translate-y-2
                  hover:shadow-blue-200/40
                  transition-all
                  duration-500
                "
              >

                {/* Image */}
                <div className="
                  relative
                  overflow-hidden
                ">
                  <img
                    src={creation.content}
                    alt="creation"
                    className="
                      w-full
                      h-[320px]
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />

                  {/* Overlay */}
                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "></div>
                </div>

                {/* Bottom Content */}
                <div className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-6
                  flex
                  items-end
                  justify-between
                  gap-4
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                ">

                  {/* Prompt */}
                  <div>
                    <h3 className="
                      text-white
                      font-semibold
                      line-clamp-2
                    ">
                      {creation.prompt}
                    </h3>

                    <p className="
                      text-white/70
                      text-sm
                      mt-1
                    ">
                      Generated with Zenith AI
                    </p>
                  </div>

                  {/* Like */}
                  <button
                    onClick={() =>
                      imageLikeToggle(creation.id)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      bg-white/15
                      backdrop-blur-xl
                      border
                      border-white/20
                      hover:scale-105
                      transition
                    "
                  >
                    <Heart
                      className={`
                        w-5
                        h-5
                        transition
                        ${
                          creation.likes.includes(user.id)
                            ? `
                              fill-red-500
                              text-red-500
                            `
                            : `
                              text-white
                            `
                        }
                      `}
                    />

                    <span className="
                      text-sm
                      font-medium
                      text-white
                    ">
                      {creation.likes.length}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
