(ns br.eng.crisjr.failproof.server.routes.home
  (:require [br.eng.crisjr.failproof.server.layout :as layout]
            [compojure.core :refer [defroutes GET PUT]]
            [ring.util.http-response :as response]
            [clojure.java.io :as io]
            [br.eng.crisjr.failproof.tools :as tools]))

(defn home-page []
  (layout/render "home.html" ))

(defn about-page []
  (layout/render
    "about.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn checklists-page []
  (let [id-list (tools/get-lists)
        titles (tools/to-titles id-list)
        links (tools/to-links id-list)
        stuff (loop [i 0
                     limit (count id-list)
                     box (list)]
                 (if (= i limit)
                    box
                    (recur (+ i 1)
                           limit
                           (conj box (vector (nth titles i)
                                             (nth links i))))))]
    (do (println stuff)
        (layout/render "checklists.html" {:stuff stuff}))))

(defn preview-page [link]
  (layout/render "preview.html" {:content (tools/get-list link)}))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/checklists" [] (checklists-page))
  (GET "/preview" []
    #(let [link (get-in %1 [:params :link])]
        (preview-page link))))
