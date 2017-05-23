(ns user
  (:require [mount.core :as mount]
            br.eng.crisjr.failproof.server.core))

(defn start []
  (mount/start-without #'br.eng.crisjr.failproof.server.core/repl-server))

(defn stop []
  (mount/stop-except #'br.eng.crisjr.failproof.server.core/repl-server))

(defn restart []
  (stop)
  (start))
