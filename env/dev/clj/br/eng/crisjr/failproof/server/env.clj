(ns br.eng.crisjr.failproof.server.env
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [br.eng.crisjr.failproof.server.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[failproof-server started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[failproof-server has shut down successfully]=-"))
   :middleware wrap-dev})
