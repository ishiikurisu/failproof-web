(ns br.eng.crisjr.failproof.server.routes.home
  (:require [br.eng.crisjr.failproof.server.layout :as layout]
            [compojure.core :refer [defroutes GET]]
            [ring.util.http-response :as response]
            [clojure.java.io :as io]))

(defn home-page []
  (layout/render "home.html" ))

(defn about-page []
  (layout/render
    "about.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn checklists-page []
  (layout/render "checklists.html" {:titles ["no such thing" "indeed"]}))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/checklists" [] (checklists-page)))
